import { Button, Step } from '@alifd/next'
import * as React from 'react'
import * as T from 'typings/graphql'

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
  stage: T.Stage
  onContinue(): void
  onSave(): void
  onLoadSolution(): void
}

const Stage = ({ stage, onContinue, onSave, onLoadSolution }: Props) => {
  if (!stage.steps) {
    throw new Error('No Stage steps found')
  }

  // grab the active step
  const activeIndex: number = stage.steps.findIndex((step: T.Step | null) => {
    return step && step.status === 'ACTIVE'
  })

  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <h2 style={styles.title}>{stage.title}</h2>
        <Markdown>{stage.text || ''}</Markdown>
      </div>
      <div style={styles.steps}>
        <Step current={activeIndex} direction="ver" shape="dot" animation readOnly>
          {stage.steps.map((step: T.Step | null, index: number) => {
            if (!step) {
              return null
            }
            return (
              <Step.Item
                key={step.id}
                title={step.title || `Step ${index + 1}`}
                content={<StepDescription text={step.text} mode={step.status} onLoadSolution={onLoadSolution} />}
              />
            )
          })}
        </Step>
      </div>

      {stage.status === 'COMPLETE' ? (
        <div style={styles.options}>
          <Button onClick={onContinue}>Continue</Button>
        </div>
      ) : (
        <div style={styles.options}>
          <Button onClick={onSave}>Save</Button>
        </div>
      )}
    </div>
  )
}

export default Stage
