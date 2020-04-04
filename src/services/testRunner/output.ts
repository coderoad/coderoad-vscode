import * as vscode from 'vscode'

let channel: vscode.OutputChannel

const getOutputChannel = (name: string): vscode.OutputChannel => {
  if (!channel) {
    channel = vscode.window.createOutputChannel(name)
  }
  return channel
}

const outputChannelName = 'CodeRoad Output'

export const displayOutput = (text: string) => {
  const channel = getOutputChannel(outputChannelName)
  channel.clear()
  channel.show(true)
  channel.append(text)
}

export const clearOutput = () => {
  const channel = getOutputChannel(outputChannelName)
  channel.show(false)
  channel.clear()
  channel.hide()
}
