import { Action } from 'typings'

declare var acquireVsCodeApi: any

const vscode = acquireVsCodeApi()

export function send(event: string | Action) {
  return vscode.postMessage(event)
}
