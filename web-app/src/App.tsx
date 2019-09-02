import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import client from './services/apollo'
import Routes from './Routes'

const App = () => (
	<ApolloProvider client={client}>
		<Routes />
	</ApolloProvider>
)

export default App
