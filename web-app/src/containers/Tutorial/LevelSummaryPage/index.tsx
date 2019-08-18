import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'

import ErrorView from '../../../components/Error'
// import Level from '../../../components/Level'
import * as T from '../../../../../typings/graphql'
import queryLevels from './queryLevels'

interface LevelProps {
  levels: T.Level[]
  send(action: string): void
}

export const LevelSummaryPage = (props: LevelProps) => {
  // const { levelId } = position
  // const level = data.levels[levelId]
  // const onNext = (): void => {
  //   props.send('NEXT')
  // }
  // const onBack = (): void => {
  //   props.send('BACK')
  // }

  // const stages: { [stageId: string]: any } = {}
  // for (const stageId of level.stageList) {
  //   stages[stageId] = {
  //     ...data.stages[stageId],
  //     status: {
  //       complete: progress.stages[stageId] || false,
  //       active: position.stageId === stageId,
  //     },
  //   }
  // }

  return <div>LevelSummaryPage</div>

  // return <Level level={level} stages={stages} onNext={onNext} onBack={onBack} />
}

interface ContainerProps {
  send(action: string): void
}

const LevelSummaryPageContainer = (props: ContainerProps) => {
  const { loading, error, data } = useQuery(queryLevels, {
    variables: {
      tutorialId: '1',
      version: '0.1.0',
      levelId: '1',
    },
  })

  if (loading) {
    return <div>Loading Levels...</div>
  }

  if (error) {
    return <ErrorView error={error} />
  }

  const { levels } = data.tutorial.version

  return <LevelSummaryPage levels={levels} send={props.send} />
}

export default LevelSummaryPageContainer
