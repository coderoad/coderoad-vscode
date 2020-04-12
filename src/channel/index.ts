import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as E from 'typings/error'
import * as vscode from 'vscode'
import saveCommit from '../actions/saveCommit'
import setupActions from '../actions/setupActions'
import solutionActions from '../actions/solutionActions'
import tutorialConfig from '../actions/tutorialConfig'
import { COMMANDS } from '../editor/commands'
import logger from '../services/logger'
import Context from './context'
import { version, compareVersions } from '../services/dependencies'
import { openWorkspace, checkWorkspaceEmpty } from '../services/workspace'
import { readFile } from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import environment from '../environment'

const readFileAsync = promisify(readFile)

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
  public receive = async (action: T.Action) => {
    // action may be an object.type or plain string
    const actionType: string = typeof action === 'string' ? action : action.type
    // const onError = (error: T.ErrorMessage) => this.send({ type: 'ERROR', payload: { error } })

    logger(`EXT RECEIVED: "${actionType}"`)

    switch (actionType) {
      case 'EDITOR_STARTUP':
        // check if a workspace is open, otherwise nothing works
        const noActiveWorksapce = !environment.WORKSPACE_ROOT.length
        if (noActiveWorksapce) {
          const error: E.ErrorMessage = {
            type: 'NoWorkspaceFound',
            message: '',
            actions: [
              {
                label: 'Open Workspace',
                transition: 'REQUEST_WORKSPACE',
              },
            ],
          }
          this.send({ type: 'NO_WORKSPACE', payload: { error } })
          return
        }

        const env = {
          machineId: vscode.env.machineId,
          sessionId: vscode.env.sessionId,
        }

        // continue from tutorial from local storage
        const tutorial: TT.Tutorial | null = this.context.tutorial.get()

        // new tutorial
        if (!tutorial || !tutorial.id) {
          this.send({ type: 'START_NEW_TUTORIAL', payload: { env } })
          return
        }

        // set tutorial
        const { position, progress } = await this.context.setTutorial(this.workspaceState, tutorial)

        if (progress.complete) {
          // tutorial is already complete
          this.send({ type: 'TUTORIAL_ALREADY_COMPLETE', payload: { env } })
          return
        }
        // communicate to client the tutorial & stepProgress state
        this.send({ type: 'LOAD_STORED_TUTORIAL', payload: { env, tutorial, progress, position } })

        return

      // clear tutorial local storage
      case 'TUTORIAL_CLEAR':
        // clear current progress/position/tutorial
        this.context.reset()
        return
      // configure test runner, language, git
      case 'EDITOR_TUTORIAL_CONFIG':
        const data: TT.Tutorial = action.payload.tutorial
        // setup tutorial config (save watcher, test runner, etc)
        await this.context.setTutorial(this.workspaceState, data)

        // validate dependencies
        const dependencies = data.config.dependencies
        if (dependencies && dependencies.length) {
          for (const dep of dependencies) {
            // check dependency is installed
            const currentVersion: string | null = await version(dep.name)
            if (!currentVersion) {
              // use a custom error message
              const error = {
                type: 'MissingTutorialDependency',
                message: dep.message || `Process "${dep.name}" is required but not found. It may need to be installed`,
                actions: [
                  {
                    label: 'Check Again',
                    transition: 'TRY_AGAIN',
                  },
                ],
              }
              this.send({ type: 'TUTORIAL_CONFIGURE_FAIL', payload: { error } })
              return
            }

            // check dependency version
            const satisfiedDependency = await compareVersions(currentVersion, dep.version)

            if (!satisfiedDependency) {
              const error = {
                type: 'UnmetTutorialDependency',
                message: `Expected ${dep.name} to have version ${dep.version}, but found version ${currentVersion}`,
                actions: [
                  {
                    label: 'Check Again',
                    transition: 'TRY_AGAIN',
                  },
                ],
              }
              this.send({ type: 'TUTORIAL_CONFIGURE_FAIL', payload: { error } })
              return
            }

            if (satisfiedDependency !== true) {
              const error = satisfiedDependency || {
                type: 'UnknownError',
                message: `Something went wrong comparing dependency for ${name}`,
                actions: [
                  {
                    label: 'Try Again',
                    transition: 'TRY_AGAIN',
                  },
                ],
              }
              this.send({ type: 'TUTORIAL_CONFIGURE_FAIL', payload: { error } })
              return
            }
          }
        }

        const error: E.ErrorMessage | void = await tutorialConfig({ config: data.config }).catch((error: Error) => ({
          type: 'UnknownError',
          message: `Location: tutorial config.\n\n${error.message}`,
        }))

        // has error
        if (error && error.type) {
          this.send({ type: 'TUTORIAL_CONFIGURE_FAIL', payload: { error } })
          return
        }

        // report back to the webview that setup is complete
        this.send({ type: 'TUTORIAL_CONFIGURED' })
        return
      case 'EDITOR_TUTORIAL_CONTINUE_CONFIG':
        const tutorialContinue: TT.Tutorial | null = this.context.tutorial.get()
        if (!tutorialContinue) {
          throw new Error('Invalid tutorial to continue')
        }
        const continueConfig: TT.TutorialConfig = tutorialContinue.config
        await tutorialConfig({
          config: continueConfig,
          alreadyConfigured: true,
        })
        // update the current stepId on startup
        vscode.commands.executeCommand(COMMANDS.SET_CURRENT_STEP, action.payload)
        return
      case 'EDITOR_VALIDATE_SETUP':
        // check workspace is selected
        const isEmptyWorkspace = await checkWorkspaceEmpty()
        if (!isEmptyWorkspace) {
          const error: E.ErrorMessage = {
            type: 'WorkspaceNotEmpty',
            message: '',
            actions: [
              {
                label: 'Open Workspace',
                transition: 'REQUEST_WORKSPACE',
              },
              {
                label: 'Check Again',
                transition: 'RETRY',
              },
            ],
          }
          this.send({ type: 'VALIDATE_SETUP_FAILED', payload: { error } })
          return
        }
        // check Git is installed.
        // Should wait for workspace before running otherwise requires access to root folder
        const isGitInstalled = await version('git')
        if (!isGitInstalled) {
          const error: E.ErrorMessage = {
            type: 'GitNotFound',
            message: '',
            actions: [
              {
                label: 'Check Again',
                transition: 'RETRY',
              },
            ],
          }
          this.send({ type: 'VALIDATE_SETUP_FAILED', payload: { error } })
          return
        }
        this.send({ type: 'SETUP_VALIDATED' })
        return
      case 'EDITOR_REQUEST_WORKSPACE':
        openWorkspace()
        return
      // load step actions (git commits, commands, open files)
      case 'SETUP_ACTIONS':
        await vscode.commands.executeCommand(COMMANDS.SET_CURRENT_STEP, action.payload)
        setupActions(action.payload, this.send)
        return
      // load solution step actions (git commits, commands, open files)
      case 'SOLUTION_ACTIONS':
        await solutionActions(action.payload, this.send)
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
    // Error middleware
    if (action?.payload?.error?.type) {
      // load error markdown message
      const error = action.payload.error
      const errorMarkdownFile = join(__dirname, '..', '..', 'errors', `${action.payload.error.type}.md`)
      const errorMarkdown = await readFileAsync(errorMarkdownFile).catch(() => {
        // onError(new Error(`Error Markdown file not found for ${action.type}`))
      })

      // log error to console for safe keeping
      logger(`ERROR:\n ${errorMarkdown}`)

      if (errorMarkdown) {
        // add a clearer error message for the user
        error.message = `${errorMarkdown}\n\n${error.message}`
      }
    }

    // action may be an object.type or plain string
    const actionType: string = typeof action === 'string' ? action : action.type

    logger(`EXT TO CLIENT: "${actionType}"`)

    switch (actionType) {
      case 'TEST_PASS':
        const tutorial = this.context.tutorial.get()
        if (!tutorial) {
          throw new Error('Error with current tutorial')
        }
        // update local storage stepProgress
        const progress = this.context.progress.setStepComplete(tutorial, action.payload.stepId)
        this.context.position.setPositionFromProgress(tutorial, progress)
        saveCommit()
    }

    // send message
    const sentToClient = await this.postMessage(action)
    if (!sentToClient) {
      throw new Error(`Message post failure: ${JSON.stringify(action)}`)
    }
  }
}

export default Channel
