import * as vscode from 'vscode'
import * as fs from 'fs'
import { promisify } from 'util'
import * as env from '../../environment'

const readDir = promisify(fs.readdir)

export const openWorkspace = () => {
  const openInNewWindow = false
  vscode.commands.executeCommand('vscode.openFolder', undefined, openInNewWindow)
}

export const checkWorkspaceEmpty = async () => {
  let files
  try {
    files = await readDir(env.WORKSPACE_ROOT, { encoding: 'utf8' })
  } catch (error) {
    throw new Error('Failed to check workspace')
  }
  return files.length === 0
}

// capture the workspace root to use the users dirname in processes
export const getWorkspaceRoot = (): string => {
  const workspaceRoots: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders
  if (!workspaceRoots || !workspaceRoots.length) {
    // no workspace root
    return ''
  }
  // a user may have multiple workspace folders
  // for simplicity, assume the first is the active workspace
  const workspaceRoot: vscode.WorkspaceFolder = workspaceRoots[0]

  // Remove leading / on windows machines. Temp solution
  if (env.OS_PLATFORM === 'win32') {
    return workspaceRoot.uri.path.substr(1)
  }

  return workspaceRoot.uri.path
}
