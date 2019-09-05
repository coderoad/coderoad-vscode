import {Action} from 'typings'
import channel from './index'

const createReceiveEvent = (action: Action) => ({
	data: action
})

// mock vscode from client side development
// @ts-ignore
window.acquireVsCodeApi = () => ({
	postMessage(action: Action) {
		console.log('postMessage', action)

		switch (action.type) {
			case 'TUTORIAL_START':
				return setTimeout(() => {
					const receiveAction: Action = {
						type: 'TUTORIAL_LOADED'
					}
					channel.receive(createReceiveEvent(receiveAction))
				}, 1000)
			case 'TEST_RUN':
				return setTimeout(() => {
					const receiveAction: Action = {
						type: 'TEST_PASS',
						payload: action.payload,
					}
					channel.receive(createReceiveEvent(receiveAction))
				}, 1000)
			default:
				console.warn(`${action.type} not found in post message mock`)
		}
	}
})