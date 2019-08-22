import ApolloClient, {InMemoryCache} from 'apollo-boost'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

const client = new ApolloClient({
	uri: process.env.REACT_APP_GQL_URI,
	headers: {
		Authorization: process.env.REACT_APP_GQL_AUTH_TOKEN,
	},
	cache: new InMemoryCache(),
	typeDefs,
	resolvers,
})

export default client