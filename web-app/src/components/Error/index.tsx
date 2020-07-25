import * as React from 'react'
import * as E from 'typings/error'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import Markdown from '../Markdown'
import Button from '../../components/Button'
import { Theme } from '../../styles/theme'

const styles = {
  container: (theme: Theme) => ({
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    border: `0.5rem solid ${theme['$color-error-2']}`,
    padding: '1rem',
    width: '100vw',
    maxWidth: '100%',
    height: '100vh',
  }),
  content: (theme: Theme) => ({
    textAlign: 'center' as 'center',
    color: theme['$color-text1-3'],
  }),
  options: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
  },
  button: {
    margin: '0.5rem',
    width: '10rem',
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
      console.log(`ERROR in markdown: ${error.message}`)
    }
  }, [error])

  if (!error) {
    return null
  }

  return (
    <div css={styles.container}>
      <h1>Oops!</h1>
      <div css={styles.content}>
        <Markdown>{error.message}</Markdown>
      </div>
      <br />
      <br />
      {/* Actions */}
      <div css={styles.options}>
        {error.actions &&
          error.actions.map((a) => (
            <Button type="normal" warning style={styles.button} onClick={() => send({ type: a.transition })}>
              {a.label}
            </Button>
          ))}
      </div>
    </div>
  )
}

export default ErrorMarkdown
