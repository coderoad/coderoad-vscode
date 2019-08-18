import { Button, Step } from '@alifd/next'
import * as React from 'react'
import * as T from 'typings/graphql'

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
  level: T.Level
  onNext(): void
  onBack(): void
}

const Level = ({ level, onNext, onBack }: Props) => {
  if (!level || !level.stages) {
    throw new Error('No level stages found')
  }
  const activeIndex = level.stages.findIndex((stage: T.Stage | null) => stage && stage.status === 'ACTIVE') || 0
  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <h2 style={styles.title}>{level.title}</h2>
        <Markdown>{level.text || ''}</Markdown>
      </div>
      <div style={styles.steps}>
        <Step current={activeIndex} direction="ver" animation={false}>
          {level.stages.map((stage: T.Stage | null, index: number) => {
            if (!stage) {
              return null
            }
            const active = stage.status === 'ACTIVE'
            const clickHandler = active
              ? onNext
              : () => {
                  /* empty */
                }
            // note - must add click handler to title, content & step.item
            // as all are separted components
            return (
              <Step.Item
                key={stage.id}
                style={{ backgroundColor: 'blue' }}
                title={
                  <span className={active ? 'hover-select' : ''} onClick={clickHandler}>
                    {stage.title || `Stage ${index + 1}`}
                  </span>
                }
                content={<LevelStageSummary key={stage.id} stage={stage} onNext={clickHandler} />}
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
