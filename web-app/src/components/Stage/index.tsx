import * as React from 'react'
import Button from '@alifd/next/lib/button'
import '@alifd/next/lib/button/style'
import Card from '@alifd/next/lib/card'
import '@alifd/next/lib/card/style'

import CR from '../../../../src/typings'

import Step from '../Step'

const styles = {
  card: {
    // width: '20rem',
  },
}

interface Props {
  stage: CR.TutorialStage
  steps: {
    [stepId: string]: any // CC.Step
  }
  onNextStage(): void
  complete: boolean
}

const Stage = ({ stage, steps, onNextStage, complete }: Props) => {
  const { title, text } = stage.content
  return (
    <Card style={styles.card} title={title} showTitleBullet={false} contentHeight="auto">
      <p>{text}</p>
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
    </Card>
  )
}

export default Stage
