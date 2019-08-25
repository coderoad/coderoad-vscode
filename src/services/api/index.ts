import {GraphQLClient} from 'graphql-request'
import * as environment from '../../environment'


// ... or create a GraphQL client instance to send requests
const client: GraphQLClient = new GraphQLClient(environment.api.url, {
	headers: {
		'Content-Type': 'application/json',
		'Authorization': environment.api.token
	}
})

export default client