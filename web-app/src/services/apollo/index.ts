import ApolloClient from 'apollo-boost'
import { GQL_URI } from '../../environment'
import { authorizeHeaders } from './auth'

const client = new ApolloClient({
  uri: GQL_URI,
  request: authorizeHeaders,
})

export default client
