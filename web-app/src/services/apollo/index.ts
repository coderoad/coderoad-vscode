import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { authorizeHeaders } from './auth'

export const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: process.env.REACT_APP_GQL_URI,
  request: authorizeHeaders,
  cache,
})

export default client
