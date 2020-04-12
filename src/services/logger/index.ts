import { LOG } from '../../environment'

const logger = (message: string | string[]) => {
  if (!LOG) {
    return
  }
  if (Array.isArray(message)) {
    message.forEach(console.log)
  } else {
    console.log(message)
  }
}

export default logger
