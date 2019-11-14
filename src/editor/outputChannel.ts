import * as vscode from 'vscode'

let channel: vscode.OutputChannel

export const getOutputChannel = (name: string): vscode.OutputChannel => {
	if (!channel) {
		channel = vscode.window.createOutputChannel(name)
	}
	return channel
}