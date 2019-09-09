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

		const editor = acquireVsCodeApi()
		this.editorSend = editor.postMessage
	}
	public machineSend = (action: Action | string) => { /* */}
	public editorSend = (action: Action) => { /* */}

	public setMachineSend = (send: any) => {
		this.machineSend = send
	}
	public receive = (event: ReceivedEvent) => {
		console.log('CLIENT RECEIVE')
		const action = event.data

		// @ts-ignore // ignore browser events from plugins
		if (action.source) {return }
		console.log(`CLIENT RECEIVE: ${action.type}`, action)
		// messages from core
		switch (action.type) {
			case 'TUTORIAL_LOADED':
				// send action to state machine
				this.machineSend('TUTORIAL_LOADED')
				console.log('send action to state machine')
				return
			case 'TEST_PASS':
				// { type: 'TEST_PASS', payload: { stepId: string }}
				this.machineSend(action)
				console.log('test passed')
				return
			case 'TEST_FAIL':
				this.machineSend(action)
				return
			case 'TEST_RUN':
				console.log('TEST_RUN')
				return
			case 'ACTIONS_LOADED':
				console.log('ACTIONS_LOADED')
				return
			default:
				if (action.type) {
					console.warn(`Unknown received action ${action.type}`, action)
				}
		}
	}
}

export default new Channel()
