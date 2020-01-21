// init error logging
import './services/sentry/init'

import Editor from './editor'

// vscode editor
export const editor = new Editor()

// activate run on vscode extension initialization
export const activate = editor.activate

// deactivate run on vscode extension shut down
export const deactivate = editor.deactivate
