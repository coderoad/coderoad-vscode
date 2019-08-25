import * as vscode from 'vscode'
import {setWorkspaceRoot} from './services/node'
import Tutorial from './services/tutorial'
import StateMachine from './state'
import Editor from './editor'

export const tutorial = new Tutorial()
// state machine that governs application logic
export const machine = new StateMachine({dispatch: vscode.commands.executeCommand, tutorial})

// vscode editor
export const editor = new Editor({
	machine,
	setWorkspaceRoot,
})

// activate run on vscode extension initialization
export const activate = editor.activate

// deactive run on vscode extension shut down
export const deactivate = editor.deactivate
