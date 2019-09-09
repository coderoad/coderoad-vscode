import * as CR from 'typings'
import * as vscode from 'vscode'

import tutorialConfig from './actions/tutorialConfig'
import setupActions from './actions/setupActions'
import solutionActions from './actions/solutionActions'

interface Channel {
	receive(action: CR.Action): Promise<void>
	send(action: CR.Action): Promise<void>
}

interface ChannelProps {
	postMessage: (action: CR.Action) => Thenable<boolean>
	storage: {
		tutorial: any
		stepProgress: any
	}
}

class Channel implements Channel {
	private postMessage: (action: CR.Action) => Thenable<boolean>
	private storage: any
	constructor({postMessage, storage}: ChannelProps) {
		this.postMessage = postMessage
		this.storage = storage
	}

	// receive from webview
	public receive = async (action: CR.Action) => {
		const actionType: string = typeof action === 'string' ? action : action.type
		console.log('RECEIVED:', actionType)
		switch (actionType) {
			// continue from tutorial from local storage
			case 'TUTORIAL_LOAD_STORED':
				const tutorial = await this.storage.tutorial.get()
				const stepProgress = await this.storage.stepProgress.get()

				console.log('looking at stored')
				console.log(JSON.stringify(tutorial))
				console.log(JSON.stringify(stepProgress))

				if (tutorial && tutorial.id) {
					this.send({type: 'CONTINUE_TUTORIAL', payload: {tutorial, stepProgress}})
				} else {
					this.send({type: 'NEW_TUTORIAL'})
				}

				return
			// clear tutorial local storage
			case 'TUTORIAL_CLEAR':
				this.storage.tutorial.set(null)
				this.storage.stepProgress.set({})
				return
			// configure test runner, language, git
			case 'TUTORIAL_CONFIG':
				tutorialConfig(action.payload)
				this.storage.tutorial.set(action.payload)
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

