import * as CR from 'typings'
import channel from '../../channel'

export default {
	tutorialStart() {
		console.log('EDITOR: TUTORIAL_START')
		channel.editorSend({
			type: 'TUTORIAL_START',
			payload: {
				tutorial: {
					id: 'some-tutorial-id'
				}
			}
		})
	},
	tutorialConfig(context: CR.MachineContext) {
		// setup test runner and git
		const {tutorial} = context
		const payload = {
			codingLanguage: tutorial.codingLanguage,
			testRunner: tutorial.testRunner,
			repo: tutorial.repo,
		}
		console.log('EDITOR: TUTORIAL_CONFIG')
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
	}
}