import * as vscode from 'vscode'
import {setWorkspaceRoot} from './services/node'
import Tutorial, {TutorialModel} from './services/tutorial'
import StateMachine from './state'
import Editor from './editor'

export const tutorialModel: TutorialModel = new Tutorial(vscode.commands.executeCommand)
// state machine that governs application logic
export const machine = new StateMachine(tutorialModel, vscode.commands.executeCommand)

// vscode editor
export const editor = new Editor({
	machine,
	setWorkspaceRoot,
})

// activate run on vscode extension initialization
export const activate = editor.activate

// deactivate run on vscode extension shut down
export const deactivate = editor.deactivate
