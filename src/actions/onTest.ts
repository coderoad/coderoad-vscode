import * as T from 'typings'
import * as vscode from 'vscode'
import { COMMANDS } from '../commands'

export const runTest = (action?: T.Action): void => {
  vscode.commands.executeCommand(COMMANDS.RUN_TEST, action?.payload)
}
