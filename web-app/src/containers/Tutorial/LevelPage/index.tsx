import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as selectors from '../../../services/selectors'
import Level from './Level'

interface PageProps {
  context: T.MachineContext
  send(action: T.Action): void
}

const LevelSummaryPageContainer = (props: PageProps) => {
  const { position, progress, processes, testStatus } = props.context

  const tutorial = selectors.currentTutorial(props.context)
  const levelData: TT.Level = selectors.currentLevel(props.context)

  const onContinue = (): void => {
    props.send({
      type: 'LEVEL_NEXT',
      payload: {
        LevelId: position.levelId,
      },
    })
  }

  const onLoadSolution = (): void => {
    props.send({ type: 'STEP_SOLUTION_LOAD' })
  }

  const level: TT.Level & {
    status: T.ProgressStatus
    index: number
    steps: Array<TT.Step & { status: T.ProgressStatus }>
  } = {
    ...levelData,
    index: tutorial.levels.findIndex((l: TT.Level) => l.id === position.levelId),
    status: progress.levels[position.levelId] ? 'COMPLETE' : 'ACTIVE',
    steps: levelData.steps.map((step: TT.Step) => {
      // label step status for step component
      let status: T.ProgressStatus = 'INCOMPLETE'
      if (progress.steps[step.id]) {
        status = 'COMPLETE'
      } else if (step.id === position.stepId) {
        status = 'ACTIVE'
      }
      return { ...step, status }
    }),
  }

  return (
    <Level
      level={level}
      onContinue={onContinue}
      onLoadSolution={onLoadSolution}
      processes={processes}
      testStatus={testStatus}
    />
  )
}

export default LevelSummaryPageContainer
