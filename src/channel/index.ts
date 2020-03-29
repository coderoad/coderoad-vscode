import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as vscode from 'vscode'
import saveCommit from '../actions/saveCommit'
import setupActions from '../actions/setupActions'
import solutionActions from '../actions/solutionActions'
import tutorialConfig from '../actions/tutorialConfig'
import { COMMANDS } from '../editor/commands'
import logger from '../services/logger'
import Context from './context'
import { openWorkspace, checkWorkspaceEmpty } from '../services/workspace'

interface Channel {
  receive(action: T.Action): Promise<void>
  send(action: T.Action): Promise<void>
}

interface ChannelProps {
  postMessage: (action: T.Action) => Thenable<boolean>
  workspaceState: vscode.Memento
  workspaceRoot: vscode.WorkspaceFolder
}

class Channel implements Channel {
  private postMessage: (action: T.Action) => Thenable<boolean>
  private workspaceState: vscode.Memento
  private workspaceRoot: vscode.WorkspaceFolder
  private context: Context
  constructor({ postMessage, workspaceState, workspaceRoot }: ChannelProps) {
    // workspaceState used for local storage
    this.workspaceState = workspaceState
    this.workspaceRoot = workspaceRoot
    this.postMessage = postMessage
    this.context = new Context(workspaceState)
  }

  // receive from webview
  public receive = async (action: T.Action) => {
    // action may be an object.type or plain string
    const actionType: string = typeof action === 'string' ? action : action.type
    const onError = (error: T.ErrorMessage) => this.send({ type: 'ERROR', payload: { error } })

    switch (actionType) {
      case 'EDITOR_ENV_GET':
        this.send({
          type: 'ENV_LOAD',
          payload: {
            env: {
              machineId: vscode.env.machineId,
              sessionId: vscode.env.sessionId,
            },
          },
        })
        return
      // continue from tutorial from local storage
      case 'EDITOR_TUTORIAL_LOAD':
        const tutorial: TT.Tutorial | null = this.context.tutorial.get()

        // new tutorial
        if (!tutorial || !tutorial.id) {
          this.send({ type: 'START_NEW_TUTORIAL' })
          return
        }

        // set tutorial
        const { position, progress } = await this.context.setTutorial(this.workspaceState, tutorial)

        if (progress.complete) {
          // tutorial is already complete
          this.send({ type: 'START_NEW_TUTORIAL' })
          return
        }
        // communicate to client the tutorial & stepProgress state
        this.send({ type: 'LOAD_STORED_TUTORIAL', payload: { tutorial, progress, position } })

        return
      // clear tutorial local storage
      case 'TUTORIAL_CLEAR':
        // clear current progress/position/tutorial
        this.context.reset()
        return
      // configure test runner, language, git
      case 'EDITOR_TUTORIAL_CONFIG':
        const tutorialData: TT.Tutorial = action.payload.tutorial
        // setup tutorial config (save watcher, test runner, etc)
        this.context.setTutorial(this.workspaceState, tutorialData)

        const data: TT.TutorialData = tutorialData.data

        await tutorialConfig({ config: data.config }, onError)

        // report back to the webview that setup is complete
        this.send({ type: 'TUTORIAL_CONFIGURED' })
        return
      case 'EDITOR_TUTORIAL_CONTINUE_CONFIG':
        const tutorialContinue: TT.Tutorial | null = this.context.tutorial.get()
        if (!tutorialContinue) {
          throw new Error('Invalid tutorial to continue')
        }
        const continueConfig: TT.TutorialConfig = tutorialContinue.data.config
        await tutorialConfig(
          {
            config: continueConfig,
            alreadyConfigured: true,
          },
          onError,
        )
        // update the current stepId on startup
        vscode.commands.executeCommand(COMMANDS.SET_CURRENT_STEP, action.payload)
        return
      case 'EDITOR_CHECK_WORKSPACE':
        const isEmptyWorkspace = await checkWorkspaceEmpty(this.workspaceRoot.uri.path)
        if (isEmptyWorkspace) {
          this.send({ type: 'IS_EMPTY_WORKSPACE' })
        } else {
          this.send({ type: 'NOT_EMPTY_WORKSPACE' })
        }
        return
      case 'EDITOR_REQUEST_WORKSPACE':
        console.log('request workspace')
        openWorkspace()
        return
      // load step actions (git commits, commands, open files)
      case 'SETUP_ACTIONS':
        await vscode.commands.executeCommand(COMMANDS.SET_CURRENT_STEP, action.payload)
        setupActions(this.workspaceRoot, action.payload, this.send)
        return
      // load solution step actions (git commits, commands, open files)
      case 'SOLUTION_ACTIONS':
        await solutionActions(this.workspaceRoot, action.payload, this.send)
        // run test following solution to update position
        vscode.commands.executeCommand(COMMANDS.RUN_TEST, action.payload)
        return

      default:
        logger(`No match for action type: ${actionType}`)
        return
    }
  }
  // send to webview
  public send = async (action: T.Action) => {
    // action may be an object.type or plain string
    const actionType: string = typeof action === 'string' ? action : action.type
    switch (actionType) {
      case 'TEST_PASS':
        const tutorial = this.context.tutorial.get()
        if (!tutorial) {
          throw new Error('Error with current tutorial')
        }
        // update local storage stepProgress
        const progress = this.context.progress.setStepComplete(tutorial.data, action.payload.stepId)
        this.context.position.setPositionFromProgress(tutorial, progress)
        saveCommit()
    }

    const success = await this.postMessage(action)
    if (!success) {
      throw new Error(`Message post failure: ${JSON.stringify(action)}`)
    }
  }
}

export default Channel
