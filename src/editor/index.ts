import * as vscode from 'vscode'
import {createCommands} from './commands'

class Editor {
	// extension context set on activation
	// @ts-ignore
	private vscodeExt: vscode.ExtensionContext

	constructor() {
		// set workspace root for node executions
		const rootPath = vscode.workspace.rootPath
		if (!rootPath) {
			throw new Error('Requires a workspace. Please open a folder')
		}
	}
	public activate = (vscodeExt: vscode.ExtensionContext): void => {
		console.log('ACTIVATE!')
		this.vscodeExt = vscodeExt

		// commands
		this.activateCommands()

		// setup tasks or views here
	}
	public deactivate = (): void => {
		console.log('DEACTIVATE!')
		// cleanup subscriptions/tasks
		for (const disposable of this.vscodeExt.subscriptions) {
			disposable.dispose()
		}
	}

	private activateCommands = (): void => {
		const commands = createCommands({
			vscodeExt: this.vscodeExt,
		})
		for (const cmd in commands) {
			const command: vscode.Disposable = vscode.commands.registerCommand(cmd, commands[cmd])
			this.vscodeExt.subscriptions.push(command)
		}
	}
}

export default Editor
