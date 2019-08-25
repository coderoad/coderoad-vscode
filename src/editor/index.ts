import * as vscode from 'vscode'
import * as CR from 'typings'
import {createCommands} from './commands'
import * as git from '../services/git'

interface Props {
	machine: CR.StateMachine
	setWorkspaceRoot(rootPath: string): void
}

class Editor {
	// extension context set on activation
	// @ts-ignore
	private vscodeExt: vscode.ExtensionContext
	private machine: CR.StateMachine

	constructor({machine, setWorkspaceRoot}: Props) {
		this.machine = machine

		// set workspace root for node executions
		const {workspace} = vscode
		const {rootPath} = workspace
		if (!rootPath) {
			throw new Error('Requires a workspace. Please open a folder')
		}
		setWorkspaceRoot(rootPath)
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
		// shut down state machine
		console.log('deactivate machine')
		this.machine.deactivate()
	}

	// execute vscode command
	public dispatch = (type: string, payload?: any) => {
		vscode.commands.executeCommand(type, payload)
	}

	private activateCommands = (): void => {
		const commands = createCommands({
			vscodeExt: this.vscodeExt,
			machine: this.machine,
			git,
		})
		for (const cmd in commands) {
			const command: vscode.Disposable = vscode.commands.registerCommand(cmd, commands[cmd])
			this.vscodeExt.subscriptions.push(command)
		}
	}
}

export default Editor
