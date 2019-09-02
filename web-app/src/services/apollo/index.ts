import ApolloClient, {InMemoryCache} from 'apollo-boost'

const client = new ApolloClient({
	uri: process.env.REACT_APP_GQL_URI,
	headers: {
		Authorization: process.env.REACT_APP_GQL_AUTH_TOKEN,
	},
	cache: new InMemoryCache(),
})

export default client