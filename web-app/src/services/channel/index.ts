import {Action} from 'typings'

declare var acquireVsCodeApi: any

// @ts-ignore
if (!window.acquireVsCodeApi) {
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

	const message = event.data
	console.log('message', message)
	// messages from core

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

