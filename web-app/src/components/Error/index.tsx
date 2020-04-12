import * as React from 'react'
import * as E from 'typings/error'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import Markdown from '../Markdown'
import Button from '../../components/Button'

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    border: '0.5rem solid #FFBABA',
    padding: '1rem',
    width: '100%',
    height: '100%',
  },
  content: {
    textAlign: 'center' as 'center',
    color: 'rgb(40, 40, 40);',
  },
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
