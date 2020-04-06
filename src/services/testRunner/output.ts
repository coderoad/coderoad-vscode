import * as vscode from 'vscode'

const channels: { key: string; value: vscode.OutputChannel } | {} = {}

const getOutputChannel = (name: string): vscode.OutputChannel => {
  if (!channels[name]) {
    channels[name] = vscode.window.createOutputChannel(name)
  }
  return channels[name]
}

interface DisplayOutput {
  channel: string
  text: string
  show?: boolean
}

export const displayOutput = (params: DisplayOutput) => {
  const channel = getOutputChannel(params.channel)
  channel.clear()
  channel.show(params.show || false)
  channel.append(params.text)
}

export const clearOutput = (channelName: string) => {
  const channel = getOutputChannel(channelName)
  channel.show(false)
  channel.clear()
  channel.hide()
}
