import * as vscode from 'vscode'

let channel: vscode.OutputChannel

const getOutputChannel = (name: string): vscode.OutputChannel => {
  if (!channel) {
    channel = vscode.window.createOutputChannel(name)
  }
  return channel
}

const outputChannelName = 'TEST_OUTPUT'

const parseOutput = (text: string): string => {
  let result = ''
  for (const line of text.split(/\r?\n/)) {
    if (line.match(/^#/) || line.match(/^not ok/)) {
      result += line + '\n'
    }
  }
  return result
}

const displayOutput = (text: string) => {
  const channel = getOutputChannel(outputChannelName)
  channel.show(true)
  const output = parseOutput(text)
  channel.append(output)
}

export default displayOutput
