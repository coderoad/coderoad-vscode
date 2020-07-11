import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import Step from './Step'
import Hints from './Hints'

interface Props {
  steps: TT.Step[]
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
      {props.steps.map((step: TT.Step & { subtasks: null | { name: string; pass: boolean }[] }) => {
        if (!step) {
          return null
        }
        return (
          <div key={step.id}>
            <Step key={step.id} status={step.status || 'INCOMPLETE'} content={step.content} subtasks={step.subtasks} />
            <Hints hints={step.hints || []} />
          </div>
        )
      })}
    </div>
  )
}

export default Steps
