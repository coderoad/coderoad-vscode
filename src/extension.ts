// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

import createCommands from './commands'
import createViews from './views'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('ACTIVATE!')

	// commands
	createCommands(context)

	// tasks
	// add tasks here

	// views
	createViews(context)
}

// this method is called when your extension is deactivated
export function deactivate(context: vscode.ExtensionContext): void {
	// cleanup subscriptions/tasks
	console.log('deactivate context', context)
	for (const disposable of context.subscriptions) {
		disposable.dispose()
	}
}
