import ReactDOM from 'react-dom'
import logger from '../logger'

// document listeners

document.addEventListener('securitypolicyviolation', (event) => {
  // TODO: add error handling
  logger(`Security warning for resource: ${JSON.stringify(event)}`)
})
