import * as vscode from 'vscode'
import ReactWebView from './ReactWebView'
import runTest from '../actions/runTest'
import {isEmptyWorkspace} from './workspace'

const COMMANDS = {
	START: 'coderoad.start',
	OPEN_WEBVIEW: 'coderoad.open_webview',
	RUN_TEST: 'coderoad.run_test',
}

interface CreateCommandProps {
	vscodeExt: vscode.ExtensionContext
}

const resetLayout = () => {
	vscode.commands.executeCommand('vscode.setEditorLayout', {
		orientation: 0,
		groups: [{groups: [{}], size: 0.6}, {groups: [{}], size: 0.4}],
	})
}

export const createCommands = ({vscodeExt}: CreateCommandProps) => {
	// React panel webview
	let webview: any

	return {
		// initialize
		[COMMANDS.START]: async () => {
			console.log('start')

			// TODO: replace with a prompt to open a workspace
			await isEmptyWorkspace()

			let webviewState: 'INITIALIZING' | 'RESTARTING'
			if (!webview) {
				webviewState = 'INITIALIZING'
			} else if (webview.loaded) {
				// already loaded
				vscode.window.showInformationMessage('CodeRoad already open')
				return
			} else {
				webviewState = 'RESTARTING'
			}

			// activate machine
			webview = new ReactWebView(vscodeExt.extensionPath)
		},
		// open React webview
		[COMMANDS.OPEN_WEBVIEW]: (column: number = vscode.ViewColumn.Two) => {
			console.log('open webview')
			// setup 1x1 horizontal layout
			resetLayout()
			webview.createOrShow(column)
		},
		[COMMANDS.RUN_TEST]: () => {
			runTest({
				onSuccess: () => {
					console.log('TEST_PASS')
					vscode.window.showInformationMessage('PASS')
				},
				onFail: () => {
					console.log('TEST_FAIL')
					vscode.window.showWarningMessage('FAIL')
				}
			})
		},
	}
}
