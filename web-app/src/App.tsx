import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import ErrorBoundary from './components/ErrorBoundary'
import client from './services/apollo'
import Routes from './Routes'


const App = () => (
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </ErrorBoundary>
)

export default App
