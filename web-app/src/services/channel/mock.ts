import {receive} from './index'

// mock vscode from client side development
// @ts-ignore
window.acquireVsCodeApi = () => ({
	postMessage(event: string) {
		console.log('postMessage', event)
	}
})