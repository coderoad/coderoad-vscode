import * as React from 'react'
import { ConfigProvider } from '@alifd/next'
import enUS from '@alifd/next/lib/locale/en-us'
import ErrorBoundary from './components/ErrorBoundary'
import Workspace from './components/Workspace'
import Routes from './Routes'

const App = () => (
  <ConfigProvider locale={enUS}>
    <ErrorBoundary>
      <Workspace>
        <Routes />
      </Workspace>
    </ErrorBoundary>
  </ConfigProvider>
)

export default App
