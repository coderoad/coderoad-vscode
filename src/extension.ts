import * as vscode from 'vscode'
import { createCommands } from './commands'
import * as telemetry from './services/telemetry'

let onDeactivate = () => {
  /* placeholder for unsubscribing fn */
}

// activate run on vscode extension initialization
export const activate = (vscodeExt: vscode.ExtensionContext): void => {
  // set out default 60/40 layout
  vscode.commands.executeCommand('vscode.setEditorLayout', {
    orientation: 0,
    groups: [{ size: 0.6 }, { size: 0.4 }],
  })

  // commands
  const commands = createCommands({
    extensionPath: vscodeExt.extensionPath,
    // NOTE: local storage must be bound to the vscodeExt.workspaceState
    workspaceState: vscodeExt.workspaceState,
  })

  const subscribe = (sub: any) => {
    vscodeExt.subscriptions.push(sub)
  }

  // register commands
  for (const cmd in commands) {
    const command: vscode.Disposable = vscode.commands.registerCommand(cmd, commands[cmd])
    subscribe(command)
  }

  telemetry.activate(subscribe)

  onDeactivate = () => {
    // cleanup subscriptions/tasks
    // handled within activate because it requires access to subscriptions
    for (const disposable of vscodeExt.subscriptions) {
      disposable.dispose()
    }

    telemetry.deactivate()
  }
}

// deactivate run on vscode extension shut down
export const deactivate = (): void => onDeactivate()
