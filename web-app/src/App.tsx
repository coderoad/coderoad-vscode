import { ApolloProvider } from '@apollo/react-hooks'
import * as React from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import Routes from './Routes'
import client from './services/apollo'

const App = () => (
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </ErrorBoundary>
)

export default App
