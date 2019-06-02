import { workspace } from 'vscode'
import * as fs from 'fs'
import * as vscode from 'vscode'
import { join } from 'path'
import { exec as cpExec } from 'child_process'
import { promisify } from 'util'

const asyncExec = promisify(cpExec)

let workspaceRoot: string

// set workspace root
// other function will use this to target the correct cwd
export async function setWorkspaceRoot(): Promise<void> {
  const { rootPath } = workspace
  if (!rootPath) {
    throw new Error('Requires a workspace. Please open a folder')
  }
  workspaceRoot = rootPath
}

export const exec = (cmd: string): Promise<{ stdout: string; stderr: string }> =>
  asyncExec(cmd, {
    cwd: workspaceRoot,
  })

// note: fs.exists is deprecated
// collect all paths together
export const exists = (...paths: string[]): boolean => fs.existsSync(join(workspaceRoot, ...paths))

export const openFile = async (relativeFilePath: string): Promise<void> => {
  try {
    const absoluteFilePath = join(workspaceRoot, relativeFilePath)
    const doc = await vscode.workspace.openTextDocument(absoluteFilePath)
    await vscode.window.showTextDocument(doc, vscode.ViewColumn.One)
  } catch (error) {
    console.log(`Failed to open file ${relativeFilePath}`, error)
  }
}


// export async function clear(): Promise<void> {
//   // remove all files including ignored
//   // NOTE: Linux only
//   const command = 'ls -A1 | xargs rm -rf'
//   const { stderr } = await exec(command)
//   if (stderr) {
//     console.error(stderr)
//     throw new Error('Error removing all files & folders')
//   }
// }