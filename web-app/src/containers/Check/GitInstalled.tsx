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
  send: (action: T.Action) => void
}

const GitInstalled = (props: Props) => {
  const onTryAgain = () => props.send({ type: 'TRY_AGAIN' })
  return (
    <div css={styles.container}>
      <h3>Git Not Installed</h3>
      <p>
        Git is required for CodeRun to run. Git is a free open-source distributed version control system. Basically, Git
        helps you easily save your file system changes.
      </p>
      <p>
        <a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git">Learn how to install Git</a>
      </p>
      <br />
      <Button type="secondary" onClick={onTryAgain}>
        Check Again
      </Button>
    </div>
  )
}

export default GitInstalled
