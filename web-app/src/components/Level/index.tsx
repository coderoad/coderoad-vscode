import { Button } from '@alifd/next'
import * as React from 'react'
import CR from 'typings'

import Divider from '../Divider'
import Markdown from '../Markdown'
import LevelStageSummary from './LevelStageSummary'

const styles = {
  card: {},
  content: {
    padding: '0rem 1rem',
    paddingBottom: '1rem',
  },
  list: {
    padding: '0rem',
  },
  options: {
    padding: '0rem 1rem',
  },
  title: {},
}

interface Props {
  level: CR.TutorialLevel
  stages: {
    [stageId: string]: any // CC.StageWithStatus
  }
  onNext(): void
  onBack(): void
}

const Level = ({ level, stages, onNext, onBack }: Props) => {
  const { title, text } = level.content
  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        <Markdown>{text}</Markdown>
      </div>
      <Divider />
      <div style={styles.list}>
        {level.stageList.map((stageId: string) => {
          const stage = stages[stageId]
          return <LevelStageSummary key={stageId} stage={stage} onNext={onNext} />
        })}
      </div>
      <div style={styles.options}>
        <Button onClick={onBack}>Back</Button>
      </div>
    </div>
  )
}

export default Level
