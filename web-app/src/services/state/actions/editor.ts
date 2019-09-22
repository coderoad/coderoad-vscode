import * as G from 'typings/graphql'
import * as CR from 'typings'
import * as selectors from '../../selectors'
import channel from '../../channel'

export default {
	loadStoredTutorial() {
		// send message to editor to see if there is existing tutorial progress
		// in local storage on the editor
		channel.editorSend({
			type: 'EDITOR_TUTORIAL_LOAD',
		})
	},
	initializeTutorial(context: CR.MachineContext, event: CR.MachineEvent) {
		// setup test runner and git
		const {tutorial} = event.data.payload
		if (!tutorial) {
			throw new Error('Invalid tutorial for tutorial config')
		}
		console.log('EDITOR: TUTORIAL_CONFIG', tutorial)
		channel.editorSend({
			type: 'EDITOR_TUTORIAL_CONFIG',
			payload: {tutorial},
		})
	},
	testStart(context: CR.MachineContext, event: CR.MachineEvent) {
		console.log('EDITOR: TEST_RUN')
		const {stepId} = event.payload
		channel.editorSend({
			type: 'TEST_RUN',
			payload: {
				stepId,
			}
		})
	},
	loadLevel(context: CR.MachineContext): void {
		const level: G.Level = selectors.currentLevel(context)
		if (level.setup) {
			// load step actions
			channel.editorSend({
				type: 'SETUP_ACTIONS',
				payload: level.setup,
			})
		}
	},
	loadStage(context: CR.MachineContext): void {
		const stage: G.Stage = selectors.currentStage(context)
		if (stage.setup) {
			// load step actions	
			channel.editorSend({
				type: 'SETUP_ACTIONS',
				payload: stage.setup,
			})
		}
	},
	loadStep(context: CR.MachineContext): void {
		const step: G.Step = selectors.currentStep(context)
		if (step.setup) {
			// load step actions
			channel.editorSend({
				type: 'SETUP_ACTIONS',
				payload: {
					stepId: step.id,
					...step.setup,
				}
			})
		}
	},
}