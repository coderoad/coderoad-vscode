import { LOG } from '../../environment'

const logger = (...messages: string[]) => {
  if (!LOG) {
    return
  }
  // Inside vscode, you console.log does not allow more than 1 param
  // to get around it, we can log with multiple log statements
  for (const message of messages) {
    console.log(message)
  }
}

export default logger
