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

const SelectWorkspace = (props: Props) => {
  const onOpenWorkspace = () => props.send({ type: 'REQUEST_WORKSPACE' })
  return (
    <div css={styles.container}>
      <h3>Select An Empty VSCode Workspace</h3>
      <p>Start a project in an empty folder.</p>
      <p>Once selected, the extension will close and need to be re-started.</p>
      <br />
      <Button type="secondary" onClick={onOpenWorkspace}>
        Open a Workspace
      </Button>
    </div>
  )
}

export default SelectWorkspace
