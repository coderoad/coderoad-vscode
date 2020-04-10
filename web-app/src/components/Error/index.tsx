import * as React from 'react'
import * as E from 'typings/error'
import { css, jsx } from '@emotion/core'
import Markdown from '../Markdown'

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
  error?: E.ErrorMessage
}

const ErrorMarkdown = ({ error }: Props) => {
  React.useEffect(() => {
    if (error) {
      // log error
      console.log(error)
    }
  }, [error])

  if (!error) {
    return null
  }

  return (
    <div css={styles.container}>
      <h1>Error</h1>
      <Markdown>{error.message}</Markdown>
    </div>
  )
}

export default ErrorMarkdown
