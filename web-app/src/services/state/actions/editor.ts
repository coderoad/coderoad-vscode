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
	testStart() {
		console.log('test start')
	}
}