import * as React from 'react'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import Button from '../../components/Button'

const styles = {
  container: {
    padding: '1rem',
  },
}

type Props = {
  error: T.ErrorMessage | null
  send: (action: T.Action) => void
}

const GitRemoteFailed = (props: Props) => {
  const onTryAgain = () => props.send({ type: 'TRY_AGAIN' })
  return (
    <div css={styles.container}>
      <h3>Git Remote Failed</h3>
      <p>Something went wrong when connecting to the Git repo.</p>
      <p>
        There may be a problem with: (1) your internet, (2) your access to a private repo, or (3) the tutorial may not
        have the correct repo name or branch.
      </p>

      {props.error && (
        <div>
          <p>See the following error below for help:</p>
          <pre>
            <code>
              {props.error.title}
              {props.error.description}
            </code>
          </pre>
        </div>
      )}

      <br />
      <Button type="secondary" onClick={onTryAgain}>
        Check Again
      </Button>
    </div>
  )
}

export default GitRemoteFailed
