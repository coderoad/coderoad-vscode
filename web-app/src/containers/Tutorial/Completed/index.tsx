import * as React from 'react'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import Button from '../../../components/Button'

const styles = {
  page: {
    padding: '1rem',
  },
  section: {
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  buttonContainer: {
    marginTop: '1rem',
  },
}

interface Props {
  context: T.MachineContext
}

const CompletedPage = (props: Props) => {
  return (
    <div css={styles.page}>
      <h1>Tutorial Complete!</h1>
      <div css={styles.section}>
        <p>Thank you for demoing the CodeRoad preview!</p>
      </div>
      <div css={styles.section}>
        <h3>Subscribe!</h3>
        <p>Sign up to our mailing list to be first to hear about future tutorials.</p>
        <div css={styles.buttonContainer}>
          <a href="https://tiny.cc/coderoad">
            <Button type="primary">Subscribe to Mailing List</Button>
          </a>
        </div>
      </div>
      <div css={styles.section}>
        <h3>Contact Us</h3>
        <p>We'd love to hear your comments, issues, ideas & feedback.</p>
        <p>
          Reach out at{' '}
          <a href="https://github.com/coderoad/coderoad-vscode">https://github.com/coderoad/coderoad-vscode</a>!
        </p>
      </div>
      <div css={styles.section}>
        <h3>Continue</h3>
        <p>To try another tutorial, open a new VSCode workspace and launch the CodeRoad app</p>
      </div>
    </div>
  )
}

export default CompletedPage
