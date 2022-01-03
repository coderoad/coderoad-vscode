import { editor } from '../state/useStateMachine'

export type Log = string | object | number | null

const logger = (...messages: Log[]): void => {
  // logs are difficult to view in the web client.
  // for debugging purposes it's easier to collect logs in the "CodeRoad (Logs)" output channel
  editor.postMessage({
    type: 'CLIENT_LOG',
    payload: messages,
    source: 'coderoad', // filter events by source on editor side
  })
}

export default logger
