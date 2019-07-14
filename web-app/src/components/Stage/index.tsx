import { Button, Step } from '@alifd/next'
import * as React from 'react'
import CR from 'typings'

import Markdown from '../Markdown'
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
  stage: CR.TutorialStage
  steps: {
    [stepId: string]: any // CC.Step
  }
  complete: boolean
  onNextStage(): void
}

const Stage = ({ stage, steps, onNextStage, complete }: Props) => {
  const { stepList, content } = stage
  const { title, text } = content
  // grab the active step
  const activeIndex = stepList.findIndex((stepId: string) => {
    return steps[stepId].status.active
  })
  // only display up until the active step
  const filteredStepList = stepList.slice(0, activeIndex + 1)
  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        <Markdown>{text}</Markdown>
      </div>
      <div style={styles.steps}>
        <Step current={activeIndex} direction="ver" shape="dot" animation>
          {filteredStepList.map((stepId: string, index: number) => {
            const step = steps[stepId]
            return (
              <Step.Item
                key={stepId}
                title={step.content.title || `Step ${index + 1}`}
                content={<StepDescription content={step.content} status={step.status} />}
              />
            )
          })}
        </Step>
      </div>

      {complete && (
        <div style={styles.options}>
          <Button onClick={onNextStage}>Continue</Button>
        </div>
      )}
    </div>
  )
}

export default Stage
