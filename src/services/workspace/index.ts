import * as vscode from 'vscode'
import * as fs from 'fs'

export const openWorkspace = () => {
  const openInNewWindow = false
  vscode.commands.executeCommand('vscode.openFolder', undefined, openInNewWindow)
}

export const checkWorkspaceEmpty = async (dirname: string) => {
  let files
  try {
    files = await fs.promises.readdir(dirname)
  } catch (error) {
    throw new Error('Failed to check workspace')
  }
  return files.length === 0
}
