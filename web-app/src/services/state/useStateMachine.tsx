import * as React from 'react'
import * as T from 'typings'
import { createMachine } from './machine'
import { useMachine } from '../xstate-react'
import logger from '../logger'

interface Output {
  context: T.MachineContext
  route: string
  send: (action: any) => void
}

declare let acquireVsCodeApi: any

export const createRouteString = (route: object | string): string => {
  if (typeof route === 'string') {
    return route
  }
  const paths: string[] = []
  let current: object | string | undefined = route
  while (current) {
    // current is final string value
    if (typeof current === 'string') {
      paths.push(current)
      break
    }

    // current is object
    const next: string = Object.keys(current)[0]
    paths.push(next)
    // @ts-ignore
    current = current[next]
  }

  return paths.join('.')
}

const editor = acquireVsCodeApi()
const editorSend = (action: T.Action) => {
  logger(`TO EXT: "${action.type}"`)
  return editor.postMessage(action)
}

// router finds first state match of <Route path='' />
const useStateMachine = (): Output => {
  const [state, send] = useMachine<T.MachineContext, any>(createMachine({ editorSend }))

  const sendWithLog = (action: T.Action): void => {
    logger(`SEND: ${action.type}`, action)
    send(action)
  }

  // event bus listener
  React.useEffect(() => {
    const listener = 'message'
    // propograte channel event to state machine
    const handler = (event: any) => {
      // NOTE: must call event.data, cannot destructure. VSCode acts odd
      const action = event.data
      // ignore browser events from other extensions
      if (action.source) {
        return
      }
      sendWithLog(action)
    }
    window.addEventListener(listener, handler)
    return () => {
      window.removeEventListener(listener, handler)
    }
  }, [])

  // convert route to a string to avoid unnecessary React re-renders on deeply nested objects
  const route = createRouteString(state.value)
  console.log(`STATE: ${route}`)

  return {
    context: state.context,
    route,
    send: sendWithLog,
  }
}

export default useStateMachine
