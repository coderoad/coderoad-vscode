import { join } from 'path'
import * as vscode from 'vscode'
import { COMMANDS } from '../../editor/commands'

const openFiles = async (files: string[]) => {
  if (!files.length) {
    return
  }
  for (const filePath of files) {
    try {
      const workspaceFolders: vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders
      if (!workspaceFolders || !workspaceFolders.length) {
        throw new Error('No workspace directory. Open a workspace directory and try again')
      }
      const wr: string = workspaceFolders[0].uri.path
      const absoluteFilePath = join(wr, filePath)
      const doc = await vscode.workspace.openTextDocument(absoluteFilePath)
      await vscode.window.showTextDocument(doc, vscode.ViewColumn.One)
      // there are times when initialization leave the panel behind any files opened
      // ensure the panel is redrawn on the right side first
      vscode.commands.executeCommand(COMMANDS.OPEN_WEBVIEW)
    } catch (error) {
      console.log(`Failed to open file ${filePath}: ${error.message}`)
    }
  }
}

export default openFiles
