import * as T from 'typings'
import * as vscode from 'vscode'
import { COMMANDS } from './commands'
import Context from './services/context/context'
import logger from './services/logger'
import { openWorkspace } from './services/workspace'
import * as actions from './actions'
import * as hooks from './services/hooks'

interface Channel {
  receive(action: T.Action): Promise<void>
}

class Channel implements Channel {
  public context: Context
  constructor(workspaceState: vscode.Memento) {
    // workspaceState used for local storages
    this.context = new Context(workspaceState)
  }

  // receive from webview
  public receive = async (action: T.Action): Promise<void> => {
    if (action.source !== 'coderoad') {
      // filter out events from other extensions
      return
    }

    // action may be an object.type or plain string
    const actionType: string = typeof action === 'string' ? action : action.type

    if (actionType === 'CLIENT_LOG') {
      // logs in web client are not easily visible
      // it's simpler to log to the "CodeRoad (Logs)" channel
      logger(action.payload)
      return
    }

    logger(actionType)

    switch (actionType) {
      case 'EDITOR_STARTUP':
        actions.onStartup(this.context)
        return
      // clear tutorial local storage
      // configure test runner, language, git
      case 'EDITOR_TUTORIAL_CONFIG':
        actions.onTutorialConfigNew(action, this.context)
        return
      case 'EDITOR_TUTORIAL_CONTINUE_CONFIG':
        actions.onTutorialConfigContinue(action, this.context)
        return
      case 'EDITOR_VALIDATE_SETUP':
        actions.onValidateSetup()
        return
      case 'EDITOR_REQUEST_WORKSPACE':
        openWorkspace()
        return
      // load step actions (git commits, commands, open files)
      case 'EDITOR_LEVEL_ENTER':
      case 'EDITOR_STEP_ENTER':
        await vscode.commands.executeCommand(COMMANDS.SET_CURRENT_POSITION, action.payload.position)
        hooks.onSetupEnter(action.payload.actions)
        return
      // load solution step actions (git commits, commands, open files)
      case 'EDITOR_SOLUTION_ENTER':
        await vscode.commands.executeCommand(COMMANDS.SET_CURRENT_POSITION, action.payload.position)
        hooks.onSolutionEnter(action.payload.actions)
        return
      case 'EDITOR_SYNC_POSITION':
        // update progress when a level is deemed complete in the client
        await this.context.position.set(action.payload.position)
        return
      case 'EDITOR_OPEN_LOGS':
        actions.onOpenLogs(action)
        return
      case 'EDITOR_RUN_TEST':
        actions.runTest(action)
        return
      case 'EDITOR_RUN_RESET_LATEST':
        actions.onRunReset({ type: 'LATEST' }, this.context)
        return
      case 'EDITOR_RUN_RESET_POSITION':
        actions.onRunReset({ type: 'POSITION', position: action.payload.position }, this.context)
        return
      case 'EDITOR_STEP_COMPLETE':
        hooks.onStepComplete(action.payload)
        return
      case 'EDITOR_LEVEL_COMPLETE':
        hooks.onLevelComplete(action.payload)
        return
      case 'EDITOR_TUTORIAL_COMPLETE':
        hooks.onTutorialComplete(action.payload)
        return
      default:
        logger(`No match for action type: ${actionType}`)
        return
    }
  }
}

export default Channel
