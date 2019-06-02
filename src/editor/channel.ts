import * as vscode from 'vscode'

let _channel: vscode.OutputChannel

export const getOutputChannel = (name: string): vscode.OutputChannel => {
  if (!_channel) {
    _channel = vscode.window.createOutputChannel(name)
  }
  return _channel
}
