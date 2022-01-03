import logger from '../logger'

document.addEventListener('securitypolicyviolation', (event) => {
  // TODO: add error handling
  if (event.isTrusted !== true) {
    logger(`Security warning for resource: ${JSON.stringify(event)}`)
  }
})
