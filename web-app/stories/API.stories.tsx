import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { css, jsx } from '@emotion/core'
import SelectWorkspace from '../src/containers/Check/SelectWorkspace'
import SideBarDecorator from './utils/SideBarDecorator'

import TUTORIALS_QUERY from '../src/services/apollo/queries/tutorials'
import { useQuery } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
  },
}

const client = new ApolloClient({
  uri: 'https://33mf420q4m.execute-api.us-west-2.amazonaws.com/stage/api-stage',
})

const Inner = () => {
  const { loading, error, data } = useQuery(TUTORIALS_QUERY)
  console.log(error)
  return (
    <div>
      <div>Error: {JSON.stringify(error)}</div>
      <div>Data: {JSON.stringify(data)}</div>
    </div>
  )
}

storiesOf('API', module)
  .addDecorator(SideBarDecorator)
  .add('Request', () => {
    return (
      <ApolloProvider client={client}>
        <Inner />
      </ApolloProvider>
    )
  })
