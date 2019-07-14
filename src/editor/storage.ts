import * as CR from 'typings'
import * as vscode from 'vscode'

let storage: vscode.Memento

// storage must be set initially
export function setStorage(workspaceState: vscode.Memento): void {
  storage = workspaceState
}

export function get<T>(key: string): T | undefined {
  return storage.get(key)
}

export function update<T>(key: string, value: string | Object): Thenable<void> {
  return storage.update(key, value)
}
