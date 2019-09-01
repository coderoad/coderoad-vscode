import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import * as T from 'typings/graphql'

import currentTutorial from '../../../services/current'
import ErrorView from '../../../components/Error'
import Level from './Level'
import queryLevel from './queryLevel'

interface LevelProps {
  level: T.Level
  send(action: string): void
}

export const LevelSummaryPage = (props: LevelProps) => {
  const onNext = (): void => {
    props.send('NEXT')
  }
  const onBack = (): void => {
    props.send('BACK')
  }
  return <Level level={props.level} onNext={onNext} onBack={onBack} />
}

interface ContainerProps {
  send(action: string): void
}

const LevelSummaryPageContainer = (props: ContainerProps) => {
	const { tutorialId, version, position: { levelId } } = currentTutorial.get()
  const { loading, error, data } = useQuery(queryLevel, {
    variables: {
      tutorialId,
      version,
      levelId,
    },
  })

  if (loading) {
    return <div>Loading Levels...</div>
  }

  if (error) {
    return <ErrorView error={error} />
  }

  const { level } = data.tutorial.version

  return <LevelSummaryPage level={level} send={props.send} />
}

export default LevelSummaryPageContainer
