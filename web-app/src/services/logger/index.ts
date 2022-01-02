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

  // Inside vscode, you console.log does not allow more than 1 param
  // to get around it, we can log with multiple log statements
  for (const message of messages) {
    if (typeof message === 'object') {
      console.log(JSON.stringify(message))
    } else {
      console.log(message)
    }
  }
}

export default logger
