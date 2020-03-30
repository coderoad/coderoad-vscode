import { ApolloError } from 'apollo-boost'
import * as React from 'react'
import { css, jsx } from '@emotion/core'
import onError from '../../services/sentry/onError'

const styles = {
  container: {
    color: '#D8000C',
    backgroundColor: '#FFBABA',
    padding: '1rem',
    width: '100%',
    height: '100%',
  },
}

interface Props {
  error?: ApolloError
}

const ErrorView = ({ error }: Props) => {
  // log error
  React.useEffect(() => {
    if (error) {
      console.log(error)
      onError(error)
    }
  }, [])

  if (!error) {
    return null
  }

  return (
    <div css={styles.container}>
      <h1>Error</h1>
      <div>{JSON.stringify(error)}</div>
    </div>
  )
}

export default ErrorView
