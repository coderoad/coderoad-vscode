import { getOutputChannel } from './output'

export type Log = any

const logChannel = getOutputChannel('CodeRoad (Logs)')

const logger = (...messages: Log[]): void => {
  for (const message of messages) {
    if (typeof message === 'object') {
      logChannel.appendLine(message)
    } else {
      logChannel.appendLine(message)
    }
  }
}

export default logger
