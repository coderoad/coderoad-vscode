import enviroment from '../../environment'

const logger = (message: string | string[]) => {
  if (!enviroment.LOG) {
    return
  }
  if (Array.isArray(message)) {
    message.forEach(console.log)
  } else {
    console.log(message)
  }
}

export default logger
