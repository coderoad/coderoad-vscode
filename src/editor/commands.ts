import * as vscode from 'vscode'
import ReactWebView from './ReactWebView'
import runTest from '../actions/runTest'

const COMMANDS = {
	START: 'coderoad.start',
	OPEN_WEBVIEW: 'coderoad.open_webview',
	RUN_TEST: 'coderoad.run_test',
	SET_CURRENT_STEP: 'coderoad.set_current_step',
}

interface CreateCommandProps {
	extensionPath: string
	workspaceState: vscode.Memento
	workspaceRoot: vscode.WorkspaceFolder
}

export const createCommands = ({extensionPath, workspaceState, workspaceRoot}: CreateCommandProps) => {
	// React panel webview
	let webview: any
	let currentStepId = ''

	return {
		// initialize
		[COMMANDS.START]: async () => {
			// TODO: replace with a prompt to open a workspace
			// await isEmptyWorkspace()

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
			webview = new ReactWebView({
				extensionPath,
				workspaceState,
				workspaceRoot,
			})
		},
		// open React webview
		[COMMANDS.OPEN_WEBVIEW]: () => {
			// setup 1x1 horizontal layout
			webview.createOrShow()
		},
		[COMMANDS.SET_CURRENT_STEP]: ({stepId}: {stepId: string}) => {
			// NOTE: as async, may sometimes be inaccurate
			// set from last setup stepAction
			currentStepId = stepId
		},
		[COMMANDS.RUN_TEST]: (current: {stepId: string} | undefined) => {
			console.log('-------- command.run_test ------ ')
			// use stepId from client, or last set stepId
			const payload = {stepId: current ? current.stepId : currentStepId}
			runTest({
				onSuccess: () => {
					// send test pass message back to client
					webview.send({type: 'TEST_PASS', payload})
					vscode.window.showInformationMessage('PASS')
				},
				onFail: () => {
					// send test fail message back to client
					webview.send({type: 'TEST_FAIL', payload})
					vscode.window.showWarningMessage('FAIL')
				},
				onError: () => {
					console.log('COMMAND TEST_ERROR')
					// send test error message back to client
					webview.send({type: 'TEST_ERROR', payload})
				},
				onRun: () => {
					// send test run message back to client
					webview.send({type: 'TEST_RUNNING', payload})
				}
			})
		},
	}
}
