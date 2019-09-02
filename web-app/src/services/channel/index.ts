import {Action} from 'typings'
import {send as stateMachineSend} from 'xstate'

declare var acquireVsCodeApi: any

// @ts-ignore
if (!window.acquireVsCodeApi) {
	// @ts-ignore
	require('./mock')
}

const channel = acquireVsCodeApi()


// Send to Editor
export const send = (action: Action) => {
	return channel.postMessage(action)
}

interface ReceivedEvent {
	data: Action
}

// Receive from Editor
export const receive = (event: ReceivedEvent): void => {

	const action = event.data

	// @ts-ignore // ignore browser events from plugins
	if (action.source) {return }

	console.log('receive action', action)
	// messages from core
	switch (action.type) {
		case 'TUTORIAL_LOADED':
			// send action to state machine
			stateMachineSend('TUTORIAL_LOADED')
			console.log(stateMachineSend)
			console.log('send action to state machine')
			return
		default:
			console.warn(`Unknown received action ${action.type}`, action)
	}

	// if (message.type === 'SET_DATA') {
	// 	// SET_DATA - set state machine context
	// 	console.log('SET_DATA updated')
	// 	const {progress, position} = message.payload
	// 	if (process.env.REACT_APP_DEBUG) {
	// 		console.log(`Position: ${position.levelId}/${position.stageId}/${position.stepId}`)
	// 		// setDebuggerInfo({ progress, position })
	// 	}
	// 	console.log('set currentTutorial')
	// 	// currentTutorial.set({position, progress})

	// }
}

