import * as vscode from 'vscode'
import * as fs from 'fs'
import { promisify } from 'util'
import environment from '../../environment'

const readDir = promisify(fs.readdir)

export const openWorkspace = () => {
  const openInNewWindow = false
  vscode.commands.executeCommand('vscode.openFolder', undefined, openInNewWindow)
}

export const checkWorkspaceEmpty = async () => {
  let files
  try {
    files = await readDir(environment.WORKSPACE_ROOT)
  } catch (error) {
    throw new Error('Failed to check workspace')
  }
  return files.length === 0
}

// capture the workspace root to use the users dirname in processes
export const getWorkspaceRoot = (): string => {
  const workspaceRoots: vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders
  if (!workspaceRoots || !workspaceRoots.length) {
    // no workspace root
    return ''
  }
  // a user may have multiple workspace folders
  // for simplicity, assume the first is the active workspace
  const workspaceRoot: vscode.WorkspaceFolder = workspaceRoots[0]
  return workspaceRoot.uri.path
}
