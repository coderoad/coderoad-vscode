import * as React from 'react'
import * as CR from 'typings'
import * as G from 'typings/graphql'

import Level from './Level'

interface LevelProps {
  level: G.Level
  send(action: string): void
}

export const LevelSummaryPage = (props: LevelProps) => {
  const onNext = (): void => {
    props.send('NEXT')
  }
  return <Level level={props.level} onNext={onNext}  />
}

interface ContainerProps {
	context: CR.MachineContext
	send(action: string): void
}

const LevelSummaryPageContainer = (props: ContainerProps) => {
	const { tutorial, position, progress } = props.context

	const level: G.Level = tutorial.version.levels.find((l: G.Level) => l.id === position.levelId)
	
	level.stages.forEach((stage: G.Stage) => {
		if (stage.id === position.stageId) {
			stage.status = 'ACTIVE'
		} else if (progress.stages[stage.id]) {
			stage.status = 'COMPLETE'
		} else {
			stage.status = 'INCOMPLETE'
		}
	})

  return <LevelSummaryPage level={level} send={props.send} />
}

export default LevelSummaryPageContainer
