import * as React from 'react'
import * as T from 'typings'
import { createMachine } from '../../services/state/machine'
import { useMachine } from '../../services/xstate-react'
import Route from './Route'
import onError from '../../services/sentry/onError'

interface Output {
  context: T.MachineContext
  send: (action: any) => void
  Router: any
  Route: any
}

declare let acquireVsCodeApi: any

const editor = acquireVsCodeApi()

// router finds first state match of <Route path='' />
const useRouter = (): Output => {
  const [state, send] = useMachine<T.MachineContext, any>(createMachine({ editorSend: editor.postMessage }))

  // event bus listener
  React.useEffect(() => {
    const listener = 'message'
    // propograte channel event to state machine
    const handler = (action: any) => {
      // NOTE: must call event.data, cannot destructure. VSCode acts odd
      const event = action.data
      // ignore browser events from plugins
      if (event.source) {
        return
      }
      send(event)
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
        pathMatch = path.some(p => state.matches(p))
      } else {
        throw new Error(`Invalid route path ${JSON.stringify(path)}`)
      }
      if (pathMatch) {
        // @ts-ignore
        return child.props.children
      }
    }
    const message = `No Route matches for ${JSON.stringify(state)}`
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
