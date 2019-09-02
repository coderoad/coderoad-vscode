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
	testPass: assign({
		progress: (context: CR.MachineContext, event: CR.MachineEvent): CR.Progress => {
			// update progress by tracking completed
			const currentProgress: CR.Progress = context.progress
			const stepId = event.payload.stepId

			currentProgress.steps[stepId] = true

			return currentProgress
		},
	}),
	// @ts-ignore
	stepLoadNext: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Position => {
			const currentPosition: CR.Position = context.position
			// merge in the updated position
			// sent with the test to ensure consistency
			return {
				...currentPosition,
				...event.payload.nextPosition,
			}
		},
	})
}