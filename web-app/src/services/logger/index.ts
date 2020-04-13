import { LOG, VERSION, NODE_ENV } from '../../environment'

export type Log = string | object | null

const logger = (...messages: Log[]): void => {
  if (!LOG) {
    return
  }
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

logger(`
ENV
---
VERSION: ${VERSION}
NODE_ENV: ${NODE_ENV}
`)

export default logger
