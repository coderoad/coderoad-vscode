import { Button } from '@alifd/next'
import * as React from 'react'
import CC from '../../../../typings/context'

import Markdown from '../Markdown'

const styles = {
  active: {
    backgroundColor: '#e6f7ff',
  },
  card: {
    padding: '0.5rem 1rem',
  },
  completed: {
    backgroundColor: '#f6ffed',
  },
  disabled: {
    // backgroundColor: 'blue',
  },
  options: {},
  title: {
    margin: 0,
  },
}

interface Props {
  stage: CC.StageWithStatus
  onNext(): void
}

const LevelStageSummary = (props: Props) => {
  const { stage, onNext } = props
  const { complete, active } = stage.status
  const cardStyle = {
    ...styles.card,
    ...(active ? styles.active : styles.disabled),
    ...(complete ? styles.completed : {}),
  }
  return (
    <div style={cardStyle}>
      <h3 style={styles.title}>{stage.content.title}</h3>
      <Markdown>{stage.content.text}</Markdown>
      <div style={styles.options}>
        {active && <Button onClick={onNext}>Continue</Button>}
        {complete && <div>Complete</div>}
      </div>
    </div>
  )
}

export default LevelStageSummary
