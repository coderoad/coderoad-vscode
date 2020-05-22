import * as E from 'typings/error'
import * as TT from 'typings/tutorial'
import * as vscode from 'vscode'
import { COMMANDS } from '../editor/commands'
import * as git from '../services/git'
import { DISABLE_RUN_ON_SAVE } from '../environment'

interface TutorialConfigParams {
  data: TT.Tutorial
  alreadyConfigured?: boolean
  onComplete?(): void
}

const tutorialConfig = async ({ data, alreadyConfigured }: TutorialConfigParams): Promise<E.ErrorMessage | void> => {
  if (!alreadyConfigured) {
    // setup git, add remote
    const initError: E.ErrorMessage | void = await git.initIfNotExists().catch(
      (error: Error): E.ErrorMessage => ({
        type: 'GitNotFound',
        message: error.message,
        actions: [{ label: 'Retry', transition: 'TRY_AGAIN' }],
      }),
    )

    if (initError) {
      return initError
    }

    // verify that internet is connected, remote exists and branch exists
    const remoteConnectError: E.ErrorMessage | void = await git.checkRemoteConnects(data.config.repo).catch(
      (error: Error): E.ErrorMessage => ({
        type: 'FailedToConnectToGitRepo',
        message: error.message,
        actions: [{ label: 'Retry', transition: 'TRY_AGAIN' }],
      }),
    )

    if (remoteConnectError) {
      return remoteConnectError
    }

    // TODO if remote not already set
    const coderoadRemoteError: E.ErrorMessage | void = await git.setupCodeRoadRemote(data.config.repo.uri).catch(
      (error: Error): E.ErrorMessage => ({
        type: 'GitRemoteAlreadyExists',
        message: error.message,
      }),
    )

    if (coderoadRemoteError) {
      return coderoadRemoteError
    }
  }

  await vscode.commands.executeCommand(COMMANDS.CONFIG_TEST_RUNNER, data)

  if (!DISABLE_RUN_ON_SAVE) {
    // verify if file test should run based on document saved
    const shouldRunTest = (document: vscode.TextDocument): boolean => {
      // must be a file
      if (document.uri.scheme !== 'file') {
        return false
      }
      return true
    }

    // setup onSave hook
    vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
      if (shouldRunTest(document)) {
        vscode.commands.executeCommand(COMMANDS.RUN_TEST)
      }
    })
  }
}

export default tutorialConfig
