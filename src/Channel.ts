import * as CR from 'typings'
import * as vscode from 'vscode'
import * as storage from './services/storage'

import tutorialConfig from './actions/tutorialConfig'
import setupActions from './actions/setupActions'
import solutionActions from './actions/solutionActions'

interface Channel {
	receive(action: CR.Action): void
	send(action: CR.Action): Promise<void>
}

class Channel implements Channel {
	private postMessage: (action: CR.Action) => Thenable<boolean>
	constructor(postMessage: (action: CR.Action) => Thenable<boolean>) {
		this.postMessage = postMessage
	}

	// receive from webview
	public receive = (action: CR.Action) => {
		const actionType: string = typeof action === 'string' ? action : action.type
		console.log('RECEIVED:', actionType)
		switch (actionType) {
			// continue from tutorial from local storage
			case 'TUTORIAL_LOAD_STORED':
				const tutorial = storage.tutorial.get()
				const stepProgress = storage.stepProgress.get()
				this.send({type: 'TUTORIAL_LOADED', payload: {tutorial, stepProgress}})
				return
			// clear tutorial local storage
			case 'TUTORIAL_CLEAR':
				storage.tutorial.set(null)
				storage.stepProgress.set({})
				return
			// configure test runner, language, git
			case 'TUTORIAL_CONFIG':
				tutorialConfig(action.payload)
				storage.tutorial.set(action.payload)
				return
			// run unit tests on step
			case 'TEST_RUN':
				vscode.commands.executeCommand('coderoad.run_test', action.payload)
				return
			// load step actions (git commits, commands, open files)
			case 'SETUP_ACTIONS':
				vscode.commands.executeCommand('coderoad.set_current_step', action.payload)
				setupActions(action.payload)
				return
			// load solution step actions (git commits, commands, open files)
			case 'SOLUTION_ACTIONS':
				solutionActions(action.payload)
				return

			default:
				console.log(`No match for action type: ${actionType}`)
				return
		}
	}
	// send to webview
	public send = async (action: CR.Action) => {
		const success = await this.postMessage(action)
		if (!success) {
			throw new Error(`Message post failure: ${JSON.stringify(action)}`)
		}
	}

}

export default Channel

