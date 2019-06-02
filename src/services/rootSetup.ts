import * as vscode from 'vscode'
import { setWorkspaceRoot } from '../services/node'
import { setStorage } from './vscode/storage'

export default async function setupRoot(context: vscode.ExtensionContext) {
  await setWorkspaceRoot()
  await setStorage(context.workspaceState)
}
