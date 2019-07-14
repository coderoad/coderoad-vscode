import { Button } from '@alifd/next'
import * as React from 'react'
import CR from 'typings'

import Markdown from '../Markdown'
import Step from '../Step'

const styles = {
  card: {
    padding: 0,
  },
  content: {
    padding: '0rem 1rem',
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
  const { title, text } = stage.content
  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        <Markdown>{text}</Markdown>
      </div>
      <div>
        {stage.stepList.map((stepId: string) => {
          const step = steps[stepId]
          return <Step key={stepId} content={step.content} status={step.status} />
        })}
      </div>
      {complete && (
        <div>
          <Button onClick={onNextStage}>Continue</Button>
        </div>
      )}
    </div>
  )
}

export default Stage
