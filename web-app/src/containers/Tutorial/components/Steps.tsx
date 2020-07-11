import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import Step from './Step'
import Hints from './Hints'

interface Props {
  steps: TT.Step[]
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
      {/* @ts-ignore typings are different between UI & data */}
      {props.steps.map((step: TT.Step & { subtasks: null | { name: string; pass: boolean }[] }, stepIndex: number) => {
        if (!step) {
          return null
        }
        return (
          <>
            <Step key={step.id} status={step.status || 'INCOMPLETE'} content={step.content} subtasks={step.subtasks} />
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
