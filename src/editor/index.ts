import * as vscode from 'vscode'
import * as CR from 'typings'
import { createCommands } from './commands'
import * as storage from '../services/storage'
import * as git from '../services/git'
import * as position from '../services/position'

interface Props {
  machine: CR.StateMachine
  setWorkspaceRoot(rootPath: string): void
}

class Editor {
  // extension context set on activation
  // @ts-ignore
  private context: vscode.ExtensionContext
  private machine: CR.StateMachine

  constructor({ machine, setWorkspaceRoot }: Props) {
    this.machine = machine

    // set workspace root for node executions
    const { workspace } = vscode
    const { rootPath } = workspace
    if (!rootPath) {
      throw new Error('Requires a workspace. Please open a folder')
    }
    setWorkspaceRoot(rootPath)
  }
  public activate = (context: vscode.ExtensionContext): void => {
    console.log('ACTIVATE!')
    this.context = context
    // commands
    this.activateCommands()

    // setup tasks or views here
  }
  public deactivate = (): void => {
    console.log('DEACTIVATE!')
    // cleanup subscriptions/tasks
    for (const disposable of this.context.subscriptions) {
      disposable.dispose()
    }
    // shut down state machine
    console.log('deactivate machine')
    this.machine.deactivate()
  }

  // execute vscode command
  public dispatch = (type: string, payload?: any) => {
    vscode.commands.executeCommand(type, payload)
  }

  private activateCommands = (): void => {
    const commands = createCommands({
      context: this.context,
      machine: this.machine,
      storage,
      git,
      position,
    })
    for (const cmd in commands) {
      const command: vscode.Disposable = vscode.commands.registerCommand(cmd, commands[cmd])
      this.context.subscriptions.push(command)
    }
  }
}

export default Editor
