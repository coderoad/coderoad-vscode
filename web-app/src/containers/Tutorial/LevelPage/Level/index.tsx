import { Button, Step } from '@alifd/next'
import * as React from 'react'
import * as G from 'typings/graphql'

import Markdown from '../../../../components/Markdown'
import StepDescription from './StepDescription'

const styles = {
  card: {
    padding: 0,
  },
  content: {
    padding: '0rem 1rem',
    paddingBottom: '1rem',
  },
  options: {
    padding: '0rem 1rem',
  },
  steps: {
    padding: '1rem 0rem',
  },
  title: {},
}

interface Props {
  level: G.Level
  onContinue(): void
  onLoadSolution(): void
}

const Level = ({ level, onContinue, onLoadSolution }: Props) => {
  if (!level.steps) {
    throw new Error('No Stage steps found')
  }

  // grab the active step
  const activeIndex: number = level.steps.findIndex((step: G.Step | null) => {
    return step && step.status === 'ACTIVE'
  })

  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <h2 style={styles.title}>{level.title}</h2>
        <Markdown>{level.description || ''}</Markdown>
      </div>
      <div style={styles.steps}>
        <Step current={activeIndex} direction="ver" shape="dot" animation readOnly>
          {level.steps.map((step: G.Step | null, index: number) => {
            if (!step) {
              return null
            }
            return (
              <Step.Item
                key={step.id}
                title={step.title || `Step ${index + 1}`}
                content={<StepDescription text={step.description} mode={step.status} onLoadSolution={onLoadSolution} />}
              />
            )
          })}
        </Step>
      </div>

      {level.status === 'COMPLETE' && (
        <div style={styles.options}>
          <Button onClick={onContinue}>Continue</Button>
        </div>
      )}
    </div>
  )
}

export default Level
