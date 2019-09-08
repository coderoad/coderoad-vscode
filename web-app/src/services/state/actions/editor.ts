import * as CR from 'typings'
import * as selectors from '../../selectors'
import channel from '../../channel'

export default {
	initializeTutorial(context: CR.MachineContext, event: CR.MachineEvent) {
		// setup test runner and git
		const {tutorial} = event.data.payload
		if (!tutorial) {
			throw new Error('Invalid tutorial for tutorial config')
		}
		const payload = {
			codingLanguage: tutorial.codingLanguage,
			testRunner: tutorial.testRunner,
			repo: tutorial.repo,
		}
		console.log('EDITOR: TUTORIAL_CONFIG', payload)
		channel.editorSend({
			type: 'TUTORIAL_CONFIG',
			payload,
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
		const level = selectors.currentLevel(context)
		if (level.setup) {
			// load step actions
			channel.editorSend({
				type: 'SETUP_ACTIONS',
				payload: level.setup,
			})
		}
	},
	loadStage(context: CR.MachineContext): void {
		const stage = selectors.currentStage(context)
		if (stage.setup) {
			// load step actions	
			channel.editorSend({
				type: 'SETUP_ACTIONS',
				payload: stage.setup,
			})
		}
	},
	loadStep(context: CR.MachineContext): void {
		const step = selectors.currentStep(context)
		if (step.setup) {
			// load step actions
			channel.editorSend({
				type: 'SETUP_ACTIONS',
				payload: step.setup,
			})
		}
	},
}