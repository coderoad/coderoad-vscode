import { Button } from '@alifd/next'
import * as React from 'react'
import CC from '../../../../typings/context'

import Markdown from '../Markdown'

const styles = {
  card: {
    // padding: '0.5rem 1rem',
    marginRight: '1.5rem',
  },
  options: {},
}

interface Props {
  stage: CC.StageWithStatus
  onNext(): void
}

const LevelStageSummary = (props: Props) => {
  const { stage, onNext } = props
  const { active } = stage.status
  return (
    <div style={styles.card}>
      <Markdown>{stage.content.text}</Markdown>
      <div style={styles.options}>{active && <Button onClick={onNext}>Continue</Button>}</div>
    </div>
  )
}

export default LevelStageSummary
