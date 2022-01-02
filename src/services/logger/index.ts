import { getOutputChannel } from './output'

export type Log = any

const logChannel = getOutputChannel('CodeRoad (Logs)')

const logger = (...messages: Log[]): void => {
  // Inside vscode, you console.log does not allow more than 1 param
  // to get around it, we can log with multiple log statements
  for (const message of messages) {
    if (typeof message === 'object') {
      logChannel.appendLine(JSON.stringify(message))
    } else {
      logChannel.appendLine(message)
    }
  }
}

export default logger
