import ReactDOM from 'react-dom'

// document listeners

document.addEventListener('securitypolicyviolation', () => {
  // TODO: add error handling
  console.log('Security warning for resource')
})
