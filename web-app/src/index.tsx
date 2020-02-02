import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// init error logging
import './services/sentry/init'
// init initial styles
import './styles/index.scss'
// init listeners
import './services/listeners'

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
