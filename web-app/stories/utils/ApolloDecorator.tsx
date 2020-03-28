import { ApolloProvider } from '@apollo/react-hooks'
import React, { Fragment } from 'react'
import client from '../../src/services/apollo'

function StorybookProvider({ children }) {
  return (
    <ApolloProvider client={client}>
      <Fragment>{children}</Fragment>
    </ApolloProvider>
  )
}

export default (story) => {
  return <StorybookProvider>{story()}</StorybookProvider>
}
