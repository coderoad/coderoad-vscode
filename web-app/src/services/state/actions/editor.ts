import * as CR from 'typings'
import channel from '../../channel'

export default {
	tutorialConfig(context: CR.MachineContext) {
		// setup test runner and git
		const {tutorial} = context
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
	loadLevel(): void {
		// load step actions	
	},
	loadStage(): void {
		// load step actions	
	},
	loadStep(): void {
		// load step actions	
	},
}