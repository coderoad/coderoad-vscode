import * as T from 'typings'
import * as vscode from 'vscode'
import * as git from '../services/git'
import setupActions from './setupActions'
import onError from '../services/sentry/onError'

const solutionActions = async (
  workspaceRoot: vscode.WorkspaceFolder,
  stepActions: T.StepActions,
  send: (action: T.Action) => void,
): Promise<void> => {
  await git.clear()
  return setupActions(workspaceRoot, stepActions, send).catch(onError)
}

export default solutionActions
