import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import * as T from 'typings/graphql'

import ErrorView from '../../../components/Error'
import Level from '../../../components/Level'
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
  const { loading, error, data } = useQuery(queryLevel, {
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

  const { level } = data.tutorial.version

  return <LevelSummaryPage level={level} send={props.send} />
}

export default LevelSummaryPageContainer
