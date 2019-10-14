import * as React from 'react'
import * as CR from 'typings'
import * as G from 'typings/graphql'
import * as selectors from '../../../services/selectors'

import Level from './Level'

interface PageProps {
  context: CR.MachineContext
  send(action: CR.Action): void
}

const LevelSummaryPageContainer = (props: PageProps) => {
  const { position, progress } = props.context

  const level: G.Level = selectors.currentLevel(props.context)

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

  level.steps.forEach((step: G.Step) => {
    if (progress.steps[step.id]) {
      step.status = 'COMPLETE'
    } else if (step.id === position.stepId) {
      step.status = 'ACTIVE'
    } else {
      step.status = 'INCOMPLETE'
    }
  })
  level.status = progress.levels[position.levelId] ? 'COMPLETE' : 'ACTIVE'

  return <Level level={level} onContinue={onContinue} onLoadSolution={onLoadSolution} />
}

export default LevelSummaryPageContainer
