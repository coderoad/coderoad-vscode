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
      <h3>Select or Create An Empty Workspace</h3>
      <p>CodeRoad runs Git commands in the background and will change your workspace files.</p>
      <br />
      <Button type="secondary" onClick={onOpenWorkspace}>
        Open a Workspace
      </Button>
    </div>
  )
}

export default SelectWorkspace
