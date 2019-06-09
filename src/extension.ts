import { setWorkspaceRoot } from './services/node'
import StateMachine from './state'
import Editor from './editor'


// state machine that governs application logic
export const machine = new StateMachine()

// vscode editor
export const editor = new Editor({
    machine,
    setWorkspaceRoot,
})

export const activate = editor.activate
export const deactivate = editor.deactivate
