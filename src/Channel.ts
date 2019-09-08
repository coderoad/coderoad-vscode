import * as CR from 'typings'
import * as vscode from 'vscode'

import tutorialConfig from './actions/tutorialConfig'
import setupActions from './actions/setupActions'
import solutionActions from './actions/solutionActions'

interface Channel {
	receive(action: CR.Action): void
	send(action: CR.Action): Promise<void>
}

class Channel implements Channel {
	private postMessage: (action: CR.Action) => Thenable<boolean>
	constructor(webview: vscode.Webview) {
		this.postMessage = webview.postMessage
	}

	// receive from webview
	public receive = (action: CR.Action) => {
		const actionType: string = typeof action === 'string' ? action : action.type
		console.log('RECEIVED:', actionType)
		switch (actionType) {
			case 'TEST_RUN':
				vscode.commands.executeCommand('coderoad.run_test')
				return
			case 'TUTORIAL_CONFIG':
				tutorialConfig(action.payload)
				return
			case 'SETUP_ACTIONS':
				setupActions(action.payload)
				return
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

