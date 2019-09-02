import * as React from 'react'
import * as CR from 'typings'
import * as G from 'typings/graphql'

import Stage from './Stage'

interface PageProps {
	context: CR.MachineContext,
  send(action: CR.Action): void
}

const StageSummaryPageContainer = (props: PageProps) => {
	const { tutorial, position, progress } = props.context

	const stage: G.Stage = tutorial.version.levels.find((l: G.Level) => l.id === position.levelId).stages.find((s: G.Stage) => s.id === position.stageId)
	
  const onContinue = (): void => {
    props.send({
			type: 'STAGE_NEXT',
			payload: {
				stageId: position.stageId,
			}
		})
	}
	
	const onSave =(): void => {
		props.send({
			type: 'TEST_RUN',
			payload: {
				stepId: position.stepId,
			}
		})
	}

	stage.steps.forEach((step: G.Step) => {
		if (step.id === position.stepId) {
			step.status = 'ACTIVE'
		} else if (progress.steps[step.id]) {
			step.status = 'COMPLETE'
		} else {
			step.status = 'INCOMPLETE'
		}
	})

  return <Stage stage={stage} onContinue={onContinue} onSave={onSave}/>
}

export default StageSummaryPageContainer
