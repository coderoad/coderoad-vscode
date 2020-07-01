import * as React from 'react'
import * as T from 'typings'
import { State } from 'xstate'
import { createMachine } from './machine'
import { useMachine } from '../xstate-react'
import logger from '../logger'

interface Output {
  context: T.MachineContext
  route: string
  send: (action: any) => void
}

declare let acquireVsCodeApi: any

const createRouteString = (routeObject: object) => {
  let paths = []
  const key = Object.keys(routeObject)[0]
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

  console.log(`STATE: ${JSON.stringify(state.value)}`)

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

  return {
    context: state.context,
    route: '',
    send: sendWithLog,
  }
}

export default useStateMachine
