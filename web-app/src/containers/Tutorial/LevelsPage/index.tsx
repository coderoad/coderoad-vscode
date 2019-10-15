import * as React from 'react'
import * as CR from 'typings'
import * as G from 'typings/graphql'

import Level from './Level'

interface LevelProps {
  level: G.Level
  send(action: string): void
}

export const LevelsSummaryPage = (props: LevelProps) => {
  const onNext = (): void => {
    props.send('NEXT')
  }
  return <Level level={props.level} onNext={onNext} />
}

interface ContainerProps {
  context: CR.MachineContext
  send(action: string): void
}

const LevelsPageContainer = (props: ContainerProps) => {
  return <div>LevelsPage</div>

  // const { tutorial, position, progress } = props.context

  // if (!tutorial) {
  //   throw new Error('Tutorial not found in LevelSummaryPageContainer')
  // }

  // const level: G.Level | undefined = tutorial.version.data.levels.find((l: G.Level) => l.id === position.levelId)

  // if (!level) {
  //   throw new Error('Level not found in LevelSummaryPageContainer')
  // }

  // level.stages.forEach((stage: G.Stage) => {
  //   if (stage.id === position.stageId) {
  //     stage.status = 'ACTIVE'
  //   } else if (progress.stages[stage.id]) {
  //     stage.status = 'COMPLETE'
  //   } else {
  //     stage.status = 'INCOMPLETE'
  //   }
  // })

  // return <LevelsSummaryPage level={level} send={props.send} />
}

export default LevelsPageContainer
