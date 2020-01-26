import * as React from 'react'
import { ClientEvents } from 'typings/events'
import * as G from 'typings/graphql'
import { MachineContext } from '../../services/state/selectTutorial'
import { css, jsx } from '@emotion/core'
import Button from '../../components/Button'
import Card from '../../components/Card'

const styles = {
  page: {
    position: 'relative' as 'relative',
    width: '100%',
  },
  header: {
    height: '2rem',
    backgroundColor: '#EBEBEB',
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 1rem',
  },
}

interface Props {
  tutorial: G.Tutorial
  onContinue(): void
  onNew(): void
}

export const ContinuePage = (props: Props) => (
  <div css={styles.page}>
    <div css={styles.header}>
      <span>CodeRoad</span>
    </div>
    <Card>
      <div>
        <h2>{props.tutorial.summary.title}</h2>
        <p>{props.tutorial.summary.description}</p>
        <Button onClick={props.onContinue}>Resume</Button>
      </div>
    </Card>
    <Card>
      <div>
        <h2>Start a New Tutorial</h2>
        <Button onClick={props.onNew}>Select New Tutorial</Button>
      </div>
    </Card>
  </div>
)

interface ContainerProps {
  context: MachineContext
  send(action: ClientEvents): void
}

const ContinuePageContainer = ({ context, send }: ContainerProps) => {
  const { tutorial } = context

  if (!tutorial) {
    throw new Error('Tutorial not found')
  }

  return (
    <ContinuePage
      tutorial={tutorial}
      onContinue={() => send({ type: 'CHOOSE_CONTINUE' })}
      onNew={() => send({ type: 'CHOOSE_NEW' })}
    />
  )
}

export default ContinuePageContainer
