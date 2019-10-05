import {Action} from 'typings'

declare var acquireVsCodeApi: any

interface ReceivedEvent {
	data: Action
}

class Channel {
	constructor() {
		// setup mock if browser only
		// @ts-ignore
		if (!window.acquireVsCodeApi) {
			// @ts-ignore
			require('./mock')
		}

		// Loads VSCode webview connection with editor
		const editor = acquireVsCodeApi()

		this.editorSend = editor.postMessage
	}
	public machineSend = (action: Action | string) => { /* */}
	public editorSend = (action: Action) => { /* */}

	public setMachineSend = (send: any) => {
		this.machineSend = send
	}
	public receive = (event: ReceivedEvent) => {
		// NOTE: must call event.data, cannot destructure. VSCode acts odd
		const action = event.data

		// @ts-ignore // ignore browser events from plugins
		if (action.source) {return }

		console.log(`CLIENT RECEIVE: ${action.type}`, action)

		// messages from core
		switch (action.type) {
			case 'ENV_LOAD':
				this.machineSend(action)
				return
			case 'TUTORIAL_LOADED':
				// send action to state machine
				this.machineSend('TUTORIAL_LOADED')
				console.log('send action to state machine')
				return
			case 'NEW_TUTORIAL':
				this.machineSend(action)
				return
			case 'TUTORIAL_CONFIGURED':
				this.machineSend(action)
				return
			case 'CONTINUE_TUTORIAL':
				this.machineSend(action)
				return
			case 'TEST_PASS':
				// { type: 'TEST_PASS', payload: { stepId: string }}
				this.machineSend(action)
				return
			case 'TEST_FAIL':
				this.machineSend(action)
				return
			case 'TEST_RUNNING':
				this.machineSend(action)
				return
			case 'TEST_ERROR':
				console.log('TEST_ERROR')
				this.machineSend(action)
				return
			case 'ACTIONS_LOADED':
				// TODO: use this for verifying completion of stepActions
				return
			default:
				if (action.type) {
					console.warn(`Unknown received action ${action.type}`, action)
				}
		}
	}
}

export default new Channel()
