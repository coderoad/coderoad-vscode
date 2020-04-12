import * as vscode from 'vscode'
import { createCommands } from './commands'

class Editor {
  // extension context set on activation
  // @ts-ignore
  private vscodeExt: vscode.ExtensionContext

  public activate = (vscodeExt: vscode.ExtensionContext): void => {
    this.vscodeExt = vscodeExt

    // set out 60/40 layout
    vscode.commands.executeCommand('vscode.setEditorLayout', {
      orientation: 0,
      groups: [{ size: 0.6 }, { size: 0.4 }],
    })

    // commands
    this.activateCommands()

    // setup tasks or views here
  }
  public deactivate = (): void => {
    // cleanup subscriptions/tasks
    for (const disposable of this.vscodeExt.subscriptions) {
      disposable.dispose()
    }
  }

  private activateCommands = (): void => {
    const commands = createCommands({
      extensionPath: this.vscodeExt.extensionPath,
      // NOTE: local storage must be bound to the vscodeExt.workspaceState
      workspaceState: this.vscodeExt.workspaceState,
    })

    // register commands
    for (const cmd in commands) {
      const command: vscode.Disposable = vscode.commands.registerCommand(cmd, commands[cmd])
      this.vscodeExt.subscriptions.push(command)
    }
  }
}

export default Editor
