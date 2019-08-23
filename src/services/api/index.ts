import * as dotenv from 'dotenv'
import {GraphQLClient} from 'graphql-request'

dotenv.config()

const url: string = process.env.API_URL || ''
const token: string = process.env.API_AUTH_TOKEN || '' // dev only

// ... or create a GraphQL client instance to send requests
const client: GraphQLClient = new GraphQLClient(url, {
	headers: {
		'Content-Type': 'application/graphql',
		'Authorization': token
	}
})

export default client