import StateMachine from './state'
import Editor from './editor'

// state machine that governs application logic
const Machine = new StateMachine()
// vscode editor
const VSCodeEditor = new Editor(Machine)

export const activate = VSCodeEditor.activate
export const deactivate = VSCodeEditor.deactivate

