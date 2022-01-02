import * as React from 'react'
import * as T from 'typings' // eslint-disable-line
import { useMachine } from '@xstate/react'
import { createMachine } from './machine'
import createRouteString from './utils/routeString'
import logger from '../logger'

interface Output {
  context: T.MachineContext
  route: string
  send: (action: any) => void
}

declare let acquireVsCodeApi: any

export const editor = acquireVsCodeApi()

const editorSend = (action: T.Action) =>
  editor.postMessage({
    ...action,
    source: 'coderoad', // filter events by source on editor side
  })

// router finds first state match of <Route path='' />
const useStateMachine = (): Output => {
  const [state, send] = useMachine<T.MachineContext, any>(createMachine({ editorSend }))

  // event bus listener
  React.useEffect(() => {
    const listener = 'message'
    // propagate channel event to state machine
    const handler = (event: any) => {
      // NOTE: must call event.data, cannot destructure. VSCode acts odd
      const action = event.data

      if (action.source !== 'coderoad') {
        // filter out events from other extensions
        return
      }
      send(action)
    }
    window.addEventListener(listener, handler)
    return () => {
      window.removeEventListener(listener, handler)
    }
  }, []) // eslint-disable-line

  // convert route to a string to avoid unnecessary React re-renders on deeply nested objects
  const route = createRouteString(state.value)
  logger(`STATE: "${route}"`)

  return {
    context: state.context,
    route,
    send,
  }
}

export default useStateMachine
