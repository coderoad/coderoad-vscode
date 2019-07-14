import { Button, Step } from '@alifd/next'
import * as React from 'react'
import CR from 'typings'
3
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
  steps: {
    padding: '1rem 0.5rem',
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
  const { content, stageList } = level
  const { title, text } = content
  const activeIndex = stageList.findIndex((stageId: string) => {
    return stages[stageId].status.active
  })
  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        <Markdown>{text}</Markdown>
      </div>
      <div style={styles.steps}>
        <Step current={activeIndex} direction="ver" animation={false}>
          {stageList.map((stageId: string, index: number) => {
            const stage = stages[stageId]
            return (
              <Step.Item
                key={stageId}
                title={stage.content.title || `Stage ${index + 1}`}
                content={<LevelStageSummary key={stageId} stage={stage} onNext={onNext} />}
              />
            )
          })}
        </Step>
      </div>
      <div style={styles.options}>
        <Button onClick={onBack}>Back</Button>
      </div>
    </div>
  )
}

export default Level
