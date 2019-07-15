import { Button, Step } from '@alifd/next'
import * as React from 'react'
import CR from 'typings'
import CC from '../../../../typings/context'

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
            const stage: CC.StageWithStatus = stages[stageId]
            const { active } = stage.status
            const clickHandler = active ? onNext : () => {}
            // note - must add click handler to title, content & step.item
            // as all are separted components
            return (
              <Step.Item
                key={stageId}
                style={{ backgroundColor: 'blue' }}
                title={
                  <span className={active ? 'hover-select' : ''} onClick={clickHandler}>
                    {stage.content.title || `Stage ${index + 1}`}
                  </span>
                }
                content={<LevelStageSummary key={stageId} stage={stage} onNext={clickHandler} />}
                onClick={clickHandler}
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
