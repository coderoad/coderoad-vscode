import * as vscode from 'vscode'

let channel: vscode.OutputChannel

const getOutputChannel = (name: string): vscode.OutputChannel => {
  if (!channel) {
    channel = vscode.window.createOutputChannel(name)
  }
  return channel
}

const outputChannelName = 'CodeRoad Output'

const parseOutput = (text: string): string => {
  let result = ''
  for (const line of text.split(/\r?\n/)) {
    if (line.match(/^#/) || line.match(/^not ok/)) {
      result += line + '\n'
    }
  }
  return result
}

export const displayOutput = (text: string) => {
  const channel = getOutputChannel(outputChannelName)
  channel.clear()
  channel.show(true)
  const output = parseOutput(text)
  channel.append(output)
}

export const clearOutput = () => {
  const channel = getOutputChannel(outputChannelName)
  channel.show(false)
  channel.clear()
  channel.hide()
}
