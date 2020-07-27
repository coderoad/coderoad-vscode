import * as T from 'typings'
import * as vscode from 'vscode'
import { COMMANDS } from './commands'
import Context from './services/context/context'
import logger from './services/logger'
import { openWorkspace } from './services/workspace'
import * as actions from './actions'

interface Channel {
  receive(action: T.Action): Promise<void>
  send(action: T.Action): Promise<void>
}

interface ChannelProps {
  postMessage: (action: T.Action) => Thenable<boolean>
  workspaceState: vscode.Memento
}

class Channel implements Channel {
  private postMessage: (action: T.Action) => Thenable<boolean>
  private workspaceState: vscode.Memento
  private context: Context
  constructor({ postMessage, workspaceState }: ChannelProps) {
    // workspaceState used for local storage
    this.workspaceState = workspaceState
    this.postMessage = postMessage
    this.context = new Context(workspaceState)
  }

  // receive from webview
  public receive = async (action: T.Action): Promise<void> => {
    // action may be an object.type or plain string
    const actionType: string = typeof action === 'string' ? action : action.type
    // const onError = (error: T.ErrorMessage) => this.send({ type: 'ERROR', payload: { error } })

    logger(`EXT RECEIVED: "${actionType}"`)

    switch (actionType) {
      case 'EDITOR_STARTUP':
        actions.onStartup(this.context, this.workspaceState, this.send)
        return
      // clear tutorial local storage
      case 'TUTORIAL_CLEAR':
        // clear current progress/position/tutorial
        this.context.reset()
        return
      // configure test runner, language, git
      case 'EDITOR_TUTORIAL_CONFIG':
        actions.onTutorialConfig(action, this.context, this.workspaceState, this.send)
        return
      case 'EDITOR_TUTORIAL_CONTINUE_CONFIG':
        actions.onTutorialContinueConfig(action, this.context, this.send)
        return
      case 'EDITOR_VALIDATE_SETUP':
        actions.onValidateSetup(this.send)
        return
      case 'EDITOR_REQUEST_WORKSPACE':
        openWorkspace()
        return
      // load step actions (git commits, commands, open files)
      case 'SETUP_ACTIONS':
        await vscode.commands.executeCommand(COMMANDS.SET_CURRENT_POSITION, action.payload.position)
        actions.onSetupActions({ actions: action.payload.actions, send: this.send })
        return
      // load solution step actions (git commits, commands, open files)
      case 'SOLUTION_ACTIONS':
        await vscode.commands.executeCommand(COMMANDS.SET_CURRENT_POSITION, action.payload.position)
        await actions.onSolutionActions({ actions: action.payload.actions, send: this.send })
        // run test following solution to update position
        actions.onRunTest()
        return
      case 'EDITOR_SYNC_PROGRESS':
        // update progress when a level is deemed complete in the client
        await this.context.progress.syncProgress(action.payload.progress)
        return
      case 'EDITOR_OPEN_LOGS':
        actions.onOpenLogs(action)
        return
      case 'EDITOR_RUN_TEST':
        actions.onRunTest(action)
        return
      case 'EDITOR_RUN_RESET':
        actions.onRunLatestReset(this.context)
        return
      default:
        logger(`No match for action type: ${actionType}`)
        return
    }
  }
  // send to webview
  public send = async (action: T.Action): Promise<void> => {
    // load error page if error action is triggered
    actions.onErrorPage(action)
    // action may be an object.type or plain string
    const actionType: string = typeof action === 'string' ? action : action.type

    logger(`EXT TO CLIENT: "${actionType}"`)

    switch (actionType) {
      case 'TEST_PASS':
        actions.onTestPass(action, this.context)
    }

    // send message
    const sentToClient = await this.postMessage(action)
    if (!sentToClient) {
      throw new Error(`Message post failure: ${JSON.stringify(action)}`)
    }
  }
}

export default Channel
