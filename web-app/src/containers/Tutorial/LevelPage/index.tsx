import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import * as G from 'typings/graphql'

import currentTutorial from '../../../services/current'
import ErrorView from '../../../components/Error'
import Level from './Level'
import queryLevel from './queryLevel'

interface LevelProps {
  level: G.Level
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
	const { tutorialId, version, position, progress } = currentTutorial.get()

	console.log('load level summary')
  const { loading, error, data } = useQuery(queryLevel, {
    variables: {
      tutorialId,
      version,
      levelId: position.levelId,
    },
	})
	
	console.log('load level data')
	console.log(JSON.stringify(data))

  if (loading) {
    return <div>Loading Levels...</div>
  }

  if (error) {
    return <ErrorView error={error} />
  }

	const { level } = data.tutorial.version
	
	level.stages.forEach((stage: G.Stage) => {
		if (stage.id === position.stageId) {
			stage.status = 'ACTIVE'
		} else if (progress.stages[stage.id]) {
			stage.status = 'COMPLETE'
		} else {
			stage.status = 'INCOMPLETE'
		}
	})

	console.log('check level')
	console.log(JSON.stringify(level))

  return <LevelSummaryPage level={level} send={props.send} />
}

export default LevelSummaryPageContainer
