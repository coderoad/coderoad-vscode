import * as React from 'react'
import ReactDOM from 'react-dom'

// mock values for non-extension web use
import './mock'

import App from './App'

// init error logging
import './services/sentry/init'
// init initial styles
import './styles/index.css'
// init listeners
import './services/listeners'

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
