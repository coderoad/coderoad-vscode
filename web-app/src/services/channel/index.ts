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
	public machineSend = (action: Action | string) => console.log('machine send')
	public editorSend = (action: Action) => console.log('editor send')

	public setMachineSend(send: any) {
		this.machineSend = send
	}
	public receive(event: ReceivedEvent) {
		const action = event.data

		// @ts-ignore // ignore browser events from plugins
		if (action.source) {return }

		console.log('receive action', action)
		// messages from core
		switch (action.type) {
			case 'TUTORIAL_LOADED':
				// send action to state machine
				this.machineSend('TUTORIAL_LOADED')
				console.log('send action to state machine')
				return
			case 'TEST_PASS':
				this.machineSend(action)
				console.log('test passed')
				return
			default:
				if (action.type) {
					console.warn(`Unknown received action ${action.type}`, action)
				}
		}
	}
}

export default new Channel()

// Send to Editor
// export const send = (action: Action) => {
// 	return
// }



// // Receive from Editor
// export const receive = (event: ReceivedEvent): void => {


// 	// if (message.type === 'SET_DATA') {
// 	// 	// SET_DATA - set state machine context
// 	// 	console.log('SET_DATA updated')
// 	// 	const {progress, position} = message.payload
// 	// 	if (process.env.REACT_APP_DEBUG) {
// 	// 		console.log(`Position: ${position.levelId}/${position.stageId}/${position.stepId}`)
// 	// 		// setDebuggerInfo({ progress, position })
// 	// 	}
// 	// 	console.log('set currentTutorial')
// 	// 	// currentTutorial.set({position, progress})

// 	// }
// }

