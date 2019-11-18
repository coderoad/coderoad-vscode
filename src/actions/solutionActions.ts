import * as T from 'typings'
import * as G from 'typings/graphql'
import * as vscode from 'vscode'
import * as git from '../services/git'
import setupActions from './setupActions'

const solutionActions = async (
  workspaceRoot: vscode.WorkspaceFolder,
  stepActions: G.StepActions,
  send: (action: T.Action) => void,
): Promise<void> => {
  await git.clear()
  return setupActions(workspaceRoot, stepActions, send)
}

export default solutionActions
