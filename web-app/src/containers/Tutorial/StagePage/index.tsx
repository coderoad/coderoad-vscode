import * as React from 'react'
import * as CR from 'typings'
import * as G from 'typings/graphql'

import Stage from './Stage'

interface PageProps {
  context: CR.MachineContext
  send(action: CR.Action): void
}

const StageSummaryPageContainer = (props: PageProps) => {
  const { tutorial, position, progress } = props.context

  if (!tutorial) {
    throw new Error('Tutorial not found in StageSummaryPageContainer')
  }

  const level: G.Level | undefined = tutorial.version.levels.find((l: G.Level) => l.id === position.levelId)

  if (!level) {
    throw new Error('Level not found in StageSummaryPageContainer')
  }

  const stage: G.Stage | undefined = level.stages.find((s: G.Stage) => s.id === position.stageId)

  if (!stage) {
    throw new Error('Stage not found in StageSummaryPageContainer')
  }

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

  return <Stage stage={stage} onContinue={onContinue} onSave={onSave} />
}

export default StageSummaryPageContainer
