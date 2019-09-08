import * as CR from 'typings'
import * as vscode from 'vscode'

interface Channel {
	receive(action: CR.Action): void
	send(action: CR.Action): void
}

class Channel implements Channel {
	private postMessage: (action: CR.Action) => Thenable<boolean>
	constructor(webview: vscode.Webview) {
		this.postMessage = webview.postMessage
	}

	// receive from webview
	public receive(action: CR.Action) {
		const actionType: string = typeof action === 'string' ? action : action.type
		console.log('RECEIVED', actionType)
		switch (actionType) {
			case 'TEST_RUN':
				return
			case 'TUTORIAL_CONFIG':
				return
			case 'STEP_ACTIONS':
				return
			// add other cases
			default:
				return
		}
	}
	// send to webview
	public async send(action: CR.Action) {
		const success = await this.postMessage(action)
		if (!success) {
			throw new Error(`Message post failure: ${JSON.stringify(action)}`)
		}
	}

}

export default Channel

