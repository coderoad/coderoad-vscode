import * as React from 'react'
import * as E from 'typings/error'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import Markdown from '../Markdown'
import Button from '../../components/Button'

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
  error: E.ErrorMessage
  send: (action: T.Action) => void
}

const ErrorMarkdown = ({ error, send }: Props) => {
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
      {/* Actions */}
      {error.actions &&
        error.actions.map((a) => (
          <Button type="secondary" onClick={() => send({ type: a.transition })}>
            {a.label}
          </Button>
        ))}
    </div>
  )
}

export default ErrorMarkdown
