import * as React from 'react'
import { MachineContext, MachineEvent } from '../../services/state/playTutorial'
import { css, jsx } from '@emotion/core'
import Button from '../../components/Button'

const styles = {
  options: {
    padding: '0rem 1rem',
  },
}

interface Props {
  context: MachineContext
  send(action: MachineEvent): void
}

const CompletedPage = (props: Props) => {
  const selectNewTutorial = () => {
    props.send({ type: 'EXIT' })
  }
  return (
    <div>
      <h3>Tutorial Complete</h3>
      <div css={styles.options}>
        <Button onClick={selectNewTutorial}>Continue</Button>
      </div>
    </div>
  )
}

export default CompletedPage
