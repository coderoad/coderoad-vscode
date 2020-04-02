import * as React from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import Routes from './Routes'

const App = () => (
  <ErrorBoundary>
    <Routes />
  </ErrorBoundary>
)

export default App
