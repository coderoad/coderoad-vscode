import * as vscode from 'vscode'
import * as TT from 'typings/tutorial'

// what are VSCode commands?
// - https://code.visualstudio.com/api/references/vscode-api#commands
// a list of commands:
// - https://code.visualstudio.com/api/references/commands (note many take params)
// - https://code.visualstudio.com/docs/getstarted/keybindings (anything keybound is a command)

const runVSCodeCommands = async (commands: TT.VSCodeCommand[] = []): Promise<void> => {
  if (!commands.length) {
    return
  }
  for (const command of commands) {
    if (typeof command === 'string') {
      // string named commands
      await vscode.commands.executeCommand(command)
    } else if (Array.isArray(command)) {
      // array commands with params
      const [name, params] = command
      await vscode.commands.executeCommand(name, params)
    }
  }
}

export default runVSCodeCommands
