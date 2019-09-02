import {Action} from 'typings'

declare var acquireVsCodeApi: any

// @ts-ignore
if (!window.acquireVsCodeApi) {
	// @ts-ignore
	window.acquireVsCodeApi = () => ({
		postMessage(event: string) {
			console.log('postMessage', event)
		}
	})
}

const vscode = acquireVsCodeApi()

export function editorDispatch(event: string | Action) {
	return vscode.postMessage(event)
}
