import React, { Fragment } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const graphqlClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  headers: {
    Authorization: process.env.GQL_AUTH_TOKEN,
  },
})

function StorybookProvider({ children }) {
  return (
    <ApolloProvider client={graphqlClient}>
      <Fragment>{children}</Fragment>
    </ApolloProvider>
  )
}

export default story => {
  return <StorybookProvider>{story()}</StorybookProvider>
}
