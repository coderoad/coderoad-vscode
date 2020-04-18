import * as React from 'react'
import * as T from 'typings'
import { createMachine } from '../../services/state/machine'
import { useMachine } from '../../services/xstate-react'
import Route from './Route'
import onError from '../../services/sentry/onError'
import logger from '../../services/logger'

interface Output {
  context: T.MachineContext
  send: (action: any) => void
  Router: any
  Route: any
}

declare let acquireVsCodeApi: any

const editor = acquireVsCodeApi()
const editorSend = (action: T.Action) => {
  logger(`CLIENT TO EXT: "${action.type}"`)
  return editor.postMessage(action)
}

// router finds first state match of <Route path='' />
const useRouter = (): Output => {
  const [state, send] = useMachine<T.MachineContext, any>(createMachine({ editorSend }))

  logger(`STATE: ${JSON.stringify(state.value)}`)

  // event bus listener
  React.useEffect(() => {
    const listener = 'message'
    // propograte channel event to state machine
    const handler = (event: any) => {
      // NOTE: must call event.data, cannot destructure. VSCode acts odd
      const action = event.data
      // ignore browser events from plugins
      if (action.source) {
        return
      }
      logger(`CLIENT RECEIVED: "${action.type}"`)
      send(action)
    }
    window.addEventListener(listener, handler)
    return () => {
      window.removeEventListener(listener, handler)
    }
  }, [])

  const Router = ({ children }: any) => {
    const childArray = React.Children.toArray(children)
    for (const child of childArray) {
      // match path
      // @ts-ignore
      const { path } = child.props
      let pathMatch
      if (typeof path === 'string') {
        pathMatch = state.matches(path)
      } else if (Array.isArray(path)) {
        pathMatch = path.some((p) => state.matches(p))
      } else {
        throw new Error(`ERROR: Invalid route path: ${JSON.stringify(path)}`)
      }
      if (pathMatch) {
        // @ts-ignore
        return child.props.children
      }
    }
    const message = `ERROR: No Route matches for ${JSON.stringify(state)}`
    onError(new Error(message))
    console.warn(message)
    return null
  }

  return {
    context: state.context,
    send,
    Router,
    Route,
  }
}

export default useRouter
