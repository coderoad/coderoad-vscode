import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import client from './services/apollo'
import Routes from './Routes'
import messageBusReceiver from './services/channel/receiver'

const App = () => {
  // event bus listener
  React.useEffect(messageBusReceiver, [])

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  )
}

export default App
