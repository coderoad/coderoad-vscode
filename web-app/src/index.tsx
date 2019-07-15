import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// base styles
// TODO: must be a better way to load @alifd styles
// currently these are loaded in src/editor/ReactWebView.ts as well
import '@alifd/next/dist/next.css'
import './styles/index.css'

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
