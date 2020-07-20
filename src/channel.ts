import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as E from 'typings/error'
import * as vscode from 'vscode'
import { satisfies } from 'semver'
import { setupActions, solutionActions } from './actions/setupActions'
import tutorialConfig from './actions/tutorialConfig'
import { COMMANDS } from './commands'
import Context from './services/context/context'
import logger from './services/logger'
import { version, compareVersions } from './services/dependencies'
import { openWorkspace, checkWorkspaceEmpty } from './services/workspace'
import { showOutput } from './services/testRunner/output'
import { exec } from './services/node'
import reset from './services/reset'
import getLastCommitHash from './services/reset/lastHash'
import { onEvent } from './services/telemetry'
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
        try {
          const data: TT.Tutorial = action.payload.tutorial

          onEvent('tutorial_start', {
            tutorial_id: data.id,
            tutorial_version: data.version,
            tutorial_title: data.summary.title,
          })

          // validate extension version
          const expectedAppVersion = data.config?.appVersions?.vscode
          if (expectedAppVersion) {
            const extension = vscode.extensions.getExtension('coderoad.coderoad')
            if (extension) {
              const currentAppVersion = extension.packageJSON.version
              const satisfied = satisfies(currentAppVersion, expectedAppVersion)
              if (!satisfied) {
                const error: E.ErrorMessage = {
                  type: 'UnmetExtensionVersion',
                  message: `Expected CodeRoad v${expectedAppVersion}, but found v${currentAppVersion}`,
                }
                this.send({ type: 'TUTORIAL_CONFIGURE_FAIL', payload: { error } })
                return
              }
            }
          }

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
                const error: E.ErrorMessage = {
                  type: 'MissingTutorialDependency',
                  message:
                    dep.message || `Process "${dep.name}" is required but not found. It may need to be installed`,
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
                const error: E.ErrorMessage = {
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
                const error: E.ErrorMessage = satisfiedDependency || {
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

          const error: E.ErrorMessage | void = await tutorialConfig({ data }).catch((error: Error) => ({
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
        } catch (e) {
          const error = {
            type: 'UnknownError',
            message: `Location: EditorTutorialConfig.\n\n ${e.message}`,
          }
          this.send({ type: 'TUTORIAL_CONFIGURE_FAIL', payload: { error } })
        }
        return
      case 'EDITOR_TUTORIAL_CONTINUE_CONFIG':
        try {
          const tutorialContinue: TT.Tutorial | null = this.context.tutorial.get()
          if (!tutorialContinue) {
            throw new Error('Invalid tutorial to continue')
          }
          await tutorialConfig({
            data: tutorialContinue,
            alreadyConfigured: true,
          })
          // update the current stepId on startup
          vscode.commands.executeCommand(COMMANDS.SET_CURRENT_POSITION, action.payload.position)
        } catch (e) {
          const error = {
            type: 'UnknownError',
            message: `Location: Editor tutorial continue config.\n\n ${e.message}`,
          }
          this.send({ type: 'CONTINUE_FAILED', payload: { error } })
        }
        return
      case 'EDITOR_VALIDATE_SETUP':
        try {
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
        } catch (e) {
          const error = {
            type: 'UknownError',
            message: e.message,
          }
          this.send({ type: 'VALIDATE_SETUP_FAILED', payload: { error } })
        }
        return
      case 'EDITOR_REQUEST_WORKSPACE':
        openWorkspace()
        return
      // load step actions (git commits, commands, open files)
      case 'SETUP_ACTIONS':
        await vscode.commands.executeCommand(COMMANDS.SET_CURRENT_POSITION, action.payload.position)
        setupActions({ actions: action.payload.actions, send: this.send })
        return
      // load solution step actions (git commits, commands, open files)
      case 'SOLUTION_ACTIONS':
        await vscode.commands.executeCommand(COMMANDS.SET_CURRENT_POSITION, action.payload.position)
        await solutionActions({ actions: action.payload.actions, send: this.send })
        // run test following solution to update position
        vscode.commands.executeCommand(COMMANDS.RUN_TEST)
        return
      case 'EDITOR_SYNC_PROGRESS':
        // update progress when a level is deemed complete in the client
        await this.context.progress.syncProgress(action.payload.progress)
        return
      case 'EDITOR_OPEN_LOGS':
        const channel = action.payload.channel
        await showOutput(channel)
        return
      case 'EDITOR_RUN_TEST':
        vscode.commands.executeCommand(COMMANDS.RUN_TEST, action?.payload)
        return
      case 'EDITOR_RUN_RESET':
        // reset to timeline
        const tutorial: TT.Tutorial | null = this.context.tutorial.get()
        const position: T.Position = this.context.position.get()

        // get last pass commit
        const hash = getLastCommitHash(position, tutorial?.levels || [])

        const branch = tutorial?.config.repo.branch

        if (!branch) {
          console.error('No repo branch found for tutorial')
          return
        }

        // load timeline until last pass commit
        reset({ branch, hash })

        // if tutorial.config.reset.command, run it
        if (tutorial?.config?.reset?.command) {
          await exec({ command: tutorial.config.reset.command })
        }
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
