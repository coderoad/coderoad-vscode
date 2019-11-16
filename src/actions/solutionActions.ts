import * as G from 'typings/graphql'
import * as vscode from 'vscode'
import * as git from '../services/git'
import setupActions from './setupActions'

const solutionActions = async (workspaceRoot: vscode.WorkspaceFolder, stepActions: G.StepActions): Promise<void> => {
  await git.clear()
  return setupActions(workspaceRoot, stepActions)
}

export default solutionActions
