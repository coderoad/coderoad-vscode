import * as vscode from 'vscode'
import { setWorkspaceRoot } from '../utils/node'
import { setStorage } from './storage'

export default async function setupRoot(context: vscode.ExtensionContext) {
  await setWorkspaceRoot()
  await setStorage(context.workspaceState)
}
