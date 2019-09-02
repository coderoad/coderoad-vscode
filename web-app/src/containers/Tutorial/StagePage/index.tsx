import * as React from 'react'
import * as CR from 'typings'
import * as G from 'typings/graphql'
import { useQuery } from '@apollo/react-hooks'

import ErrorView from '../../../components/Error'
import Stage from './Stage'
import queryStage from './queryStage'

interface PageProps {
	context: CR.MachineContext,
  send(action: string): void
}

const StageSummaryPageContainer = (props: PageProps) => {
	const { tutorial, position, progress } = props.context
  const { loading, error, data } = useQuery(queryStage, {
    variables: {
      tutorialId: tutorial.id,
      version: tutorial.version.version,
      stageId: position.stageId,
    },
  })
  if (loading) {
    return <div>Loading Stage...</div>
  }

  if (error) {
    return <ErrorView error={error} />
  }

	const { stage } = data.tutorial.version
	
	stage.steps.forEach((step: G.Step) => {
		if (step.id === position.stepId) {
			step.status = 'ACTIVE'
		} else if (progress.steps[step.id]) {
			step.status = 'COMPLETE'
		} else {
			step.status = 'INCOMPLETE'
		}
	})

  const onContinue = (): void => {
    props.send('STAGE_NEXT')
  }

  return <Stage stage={stage} onContinue={onContinue} />
}

export default StageSummaryPageContainer
