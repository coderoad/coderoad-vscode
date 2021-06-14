import * as React from 'react'
import * as T from 'typings'
import Step from './Step'
import Hints from './Hints'

interface Props {
  steps: T.StepUI[]
  displayAll?: boolean
}

const styles = {
  steps: {
    padding: '1rem 1rem',
  },
}

const Steps = (props: Props) => {
  if (!props.steps.length) {
    return null
  }
  return (
    <div css={styles.steps}>
      {/* @ts-ignore typings are different between UI & data */}
      {props.steps.map((step: T.StepUI) => {
        if (!step) {
          return null
        }

        return (
          <div key={step.id}>
            <Step
              key={step.id}
              status={step.status}
              displayAll={props.displayAll || false}
              content={step.content}
              subtasks={step.subtasks}
            />
            {['ACTIVE', 'COMPLETE'].includes(step.status) && <Hints hints={step.hints || []} />}
          </div>
        )
      })}
    </div>
  )
}

export default Steps
