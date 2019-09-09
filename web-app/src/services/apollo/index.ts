import ApolloClient, {InMemoryCache} from 'apollo-boost'

export const cache = new InMemoryCache()

const client = new ApolloClient({
	uri: process.env.REACT_APP_GQL_URI,
	headers: {
		Authorization: process.env.REACT_APP_GQL_AUTH_TOKEN,
	},
	cache,
})

export default client