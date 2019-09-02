import {Action} from 'typings'

declare var acquireVsCodeApi: any

// @ts-ignore
window.acquireVsCodeApi = () => ({
	postMessage(event: string) {
		console.log('postMessage', event)
	}
})

const vscode = acquireVsCodeApi()

export function send(event: string | Action) {
	return vscode.postMessage(event)
}
