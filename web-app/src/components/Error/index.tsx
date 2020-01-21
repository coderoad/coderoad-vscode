import { ApolloError } from 'apollo-boost'
import { GraphQLError } from 'graphql'
import * as React from 'react'
import { css, jsx } from '@emotion/core'
import onError from '../../services/sentry/onError'

const styles = {
  container: {
    color: '#D8000C',
    backgroundColor: '#FFBABA',
    padding: '1rem',
  },
}

interface Props {
  error: ApolloError
}

const ErrorView = ({ error }: Props) => {
  // log error
  React.useEffect(() => {
    console.log(error)
    onError(error)
  }, [])

  return (
    <div css={styles.container}>
      <h1>Error</h1>
      {error.graphQLErrors && (
        <div>
          {error.graphQLErrors.map(({ message, locations, path }: GraphQLError, index: number) => (
            <h5 key={index}>
              <b>[GraphQL error]:</b> Message: {message}, Location: {locations}, Path: {path}
            </h5>
          ))}
        </div>
      )}
      {error.networkError && (
        <h5>
          <b>[Network error]:</b> {error.networkError.message}
        </h5>
      )}
      {error.extraInfo && (
        <p>
          <b>[Extra info]:</b> {JSON.stringify(error.extraInfo)}
        </p>
      )}
    </div>
  )
}

export default ErrorView
