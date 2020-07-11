import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import Step from './Step'
import Hints from './Hints'

interface Props {
  steps: TT.Step[]
  testStatus: T.TestStatus | null
  displayHintsIndex: number[]
  setHintsIndex(stepIndex: number, value: number): void
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
      {props.steps.map((step: TT.Step | null, stepIndex: number) => {
        if (!step) {
          return null
        }
        let subtasks = null
        if (step?.subtasks) {
          subtasks = step.subtasks.map((subtask: string, subtaskIndex: number) => ({
            name: subtask,
            pass: !!(props.testStatus?.summary ? props.testStatus.summary[subtaskIndex] : false),
          }))
        }
        return (
          <>
            <Step key={step.id} status={step.status || 'INCOMPLETE'} content={step.content} subtasks={subtasks} />
            <Hints
              hints={step.hints || []}
              hintIndex={props.displayHintsIndex[stepIndex]}
              setHintIndex={(value) => props.setHintsIndex(stepIndex, value)}
            />
          </>
        )
      })}
    </div>
  )
}

export default Steps
