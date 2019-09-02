import {Action} from 'typings'
import {receive} from './index'

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
					receive(createReceiveEvent(receiveAction))
				}, 1000)
			default:
				console.warn(`${action.type} not found in post message mock`)
		}
	}
})