import {assign} from 'xstate'
import * as G from 'typings/graphql'
import * as CR from 'typings'

export default {
	setTutorial: assign({
		tutorial: (context: CR.MachineContext, event: CR.MachineEvent): any => {
			return event.payload.tutorial
		},
	}),
	// @ts-ignore
	initPosition: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Position => {
			if (!event.payload.tutorial) {
				throw new Error('Invalid tutorial')
			}

			const version: G.TutorialVersion = event.payload.tutorial.version

			const position: CR.Position = {
				levelId: version.levels[0].id,
				stageId: version.levels[0].stages[0].id,
				stepId: version.levels[0].stages[0].steps[0].id,
			}

			return position
		},
	}),
	// @ts-ignore
	updateStepProgress: assign({
		progress: (context: CR.MachineContext, event: CR.MachineEvent): CR.Progress => {
			// update progress by tracking completed
			const currentProgress: CR.Progress = context.progress
			console.log('progress update', event.payload)
			const stepId = event.payload.stepId

			currentProgress.steps[stepId] = true

			return currentProgress
		},
	}),
	// @ts-ignore
	stepLoadNext: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Position => {
			const position: CR.Position = context.position
			// merge in the updated position
			// sent with the test to ensure consistency
			const steps: G.Step[] = context.tutorial.version
				.levels.find((l: G.Level) => l.id === position.levelId)
				.stages.find((s: G.Stage) => s.id === position.stageId)
				.steps

			const stepIndex = steps.findIndex((s: G.Step) => s.id === position.stepId)
			console.log('step index', stepIndex)
			const step: G.Step = steps[stepIndex + 1]

			console.log('step load next', step.id, position.stepId)

			return {
				...position,
				stepId: step.id
			}
		},
	})
}