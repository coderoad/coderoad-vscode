import { join } from 'path'
import * as vscode from 'vscode'
import { COMMANDS } from '../../editor/commands'

const openFiles = async (files: string[]) => {
  if (!files.length) {
    return
  }
  for (const filePath of files) {
    try {
      // TODO: figure out why this does not work
      // 	try {
      // 		const absoluteFilePath = join(workspaceRoot.uri.path, filePath)
      // 		const doc = await vscode.workspace.openTextDocument(absoluteFilePath)
      // 		await vscode.window.showTextDocument(doc, vscode.ViewColumn.One)
      // 		// there are times when initialization leave the panel behind any files opened
      // 		// ensure the panel is redrawn on the right side first
      // 		// webview.createOrShow()
      // 	} catch (error) {
      // 		console.log(`Failed to open file ${filePath}`, error)
      // 	}
      const wr = vscode.workspace.rootPath
      if (!wr) {
        throw new Error('No workspace root path')
      }
      const absoluteFilePath = join(wr, filePath)
      const doc = await vscode.workspace.openTextDocument(absoluteFilePath)
      await vscode.window.showTextDocument(doc, vscode.ViewColumn.One)
      // there are times when initialization leave the panel behind any files opened
      // ensure the panel is redrawn on the right side first
      vscode.commands.executeCommand(COMMANDS.OPEN_WEBVIEW)
    } catch (error) {
      console.log(`Failed to open file ${filePath}`, error)
    }
  }
}

export default openFiles
