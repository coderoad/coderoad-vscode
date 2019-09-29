import * as React from 'react'
import * as CR from 'typings'
import * as G from 'typings/graphql'
import * as selectors from '../../../services/selectors'

import Stage from './Stage'

interface PageProps {
  context: CR.MachineContext
  send(action: CR.Action): void
}

const StageSummaryPageContainer = (props: PageProps) => {
  const { position, progress } = props.context

  const stage: G.Stage = selectors.currentStage(props.context)

  const onContinue = (): void => {
    props.send({
      type: 'STAGE_NEXT',
      payload: {
        stageId: position.stageId,
      },
    })
  }

  const onSave = (): void => {
    props.send({
      type: 'TEST_RUN',
      payload: {
        stepId: position.stepId,
      },
    })
  }

  const onLoadSolution = (): void => {
    props.send({ type: 'STEP_SOLUTION_LOAD' })
  }

  stage.steps.forEach((step: G.Step) => {
    if (progress.steps[step.id]) {
      step.status = 'COMPLETE'
    } else if (step.id === position.stepId) {
      step.status = 'ACTIVE'
    } else {
      step.status = 'INCOMPLETE'
    }
  })
  stage.status = progress.stages[position.stageId] ? 'COMPLETE' : 'ACTIVE'

  return <Stage stage={stage} onContinue={onContinue} onSave={onSave} onLoadSolution={onLoadSolution} />
}

export default StageSummaryPageContainer
