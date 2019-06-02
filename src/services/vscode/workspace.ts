import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import { exec, exists } from '../node'

export async function isEmptyWorkspace(): Promise<boolean> {
  const { stdout, stderr } = await exec('ls')
  if (stderr) {
    throw new Error('Error validating if project is empty')
  }
  return !stdout.length
}

// TODO: workspace change listener
export async function openReadme(): Promise<void> {
  const { stderr } = await exec('ls')
  if (stderr) {
    throw new Error('Error looking for initial file')
  }

  const file = 'README.md'
  const filePath = path.join(vscode.workspace.rootPath || '', file)
  console.log('filePath', filePath)
  const hasReadme = await exists(file)

  if (!hasReadme) {
    // add readme if none exists
    try {
      const content = '# Welcome to CodeRoad!'
      fs.writeFileSync(filePath, content, 'utf8')
    } catch (error) {
      throw new Error('Error writing READM.md')
    }
  }

  try {
    const openPath = vscode.Uri.parse(filePath)
    const doc = await vscode.workspace.openTextDocument(openPath)
    await vscode.window.showTextDocument(doc)
  } catch (error) {
    throw new Error('Error opening README doc')
  }
}
