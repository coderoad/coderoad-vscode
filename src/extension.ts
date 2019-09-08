// import * as vscode from 'vscode'
// import Tutorial, {TutorialModel} from './services/tutorial'
import Editor from './editor'

// export const tutorialModel: TutorialModel = new Tutorial(vscode.commands.executeCommand)

// vscode editor
export const editor = new Editor()

// activate run on vscode extension initialization
export const activate = editor.activate

// deactivate run on vscode extension shut down
export const deactivate = editor.deactivate
