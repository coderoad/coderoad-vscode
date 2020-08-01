import * as git from '../services/git'
import * as T from 'typings'
import * as vscode from 'vscode'
import { COMMANDS } from '../commands'
import Context from '../services/context/context'

export const onTestPass = (action: T.Action, context: Context): void => {
  context.position.set({ ...action.payload.position, complete: true })
  git.saveCommit('Save progress')
}

export const onRunTest = (action?: T.Action): void => {
  vscode.commands.executeCommand(COMMANDS.RUN_TEST, action?.payload)
}
