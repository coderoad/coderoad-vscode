import * as CR from 'typings'
import channel from '../../channel'

export default {
	tutorialStart() {
		channel.editorSend({
			type: 'TUTORIAL_START',
			payload: {
				tutorial: {
					id: 'some-tutorial-id'
				}
			}
		})
	},
	testRunnerSetup(context: CR.MachineContext) {
		console.log('test runner setup', context)
	},
	testStart(context: CR.MachineContext, event: CR.MachineEvent) {
		console.log('test start')
		const {stepId} = event.payload
		channel.editorSend({
			type: 'TEST_RUN',
			payload: {
				stepId,
			}
		})
	}
}