import * as vscode from 'vscode'

const channels: { key: string; value: vscode.OutputChannel } | {} = {}

const getOutputChannel = (name: string): vscode.OutputChannel => {
  if (!channels[name]) {
    channels[name] = vscode.window.createOutputChannel(name)
  }
  return channels[name]
}

interface ChannelOutput {
  channel: string
  text: string
  show?: boolean
}

export const addOutput = (params: ChannelOutput) => {
  const channel = getOutputChannel(params.channel)
  channel.clear()
  channel.append(params.text)
}

export const showOutput = (channelName: string) => {
  const channel = getOutputChannel(channelName)
  channel.show()
}

export const clearOutput = (channelName: string) => {
  const channel = getOutputChannel(channelName)
  channel.clear()
  channel.hide()
}
