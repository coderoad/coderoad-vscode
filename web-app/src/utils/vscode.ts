import { Action } from 'typings'

declare var acquireVsCodeApi: any

// @ts-ignore
const vscode = window.acquireVsCodeApi ? acquireVsCodeApi() : {
  postMessage(event: string) {
    console.log('postMessage', event)
  }
}

export function send(event: string | Action) {
  return vscode.postMessage(event)
}
