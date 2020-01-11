import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { GQL_URI } from '../../environment'
import { authorizeHeaders } from './auth'

export const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: GQL_URI,
  request: authorizeHeaders,
  cache,
})

export default client
