import * as E from 'typings/error'
import * as TT from 'typings/tutorial'
import * as vscode from 'vscode'
import { COMMANDS } from '../editor/commands'
import * as git from '../services/git'

interface TutorialConfigParams {
  config: TT.TutorialConfig
  alreadyConfigured?: boolean
  onComplete?(): void
}

const tutorialConfig = async ({ config, alreadyConfigured }: TutorialConfigParams): Promise<E.ErrorMessage | void> => {
  if (!alreadyConfigured) {
    // setup git, add remote
    await git.initIfNotExists().catch((error: Error) => {
      return {
        type: 'GitNotFound',
        message: error.message,
      }
    })

    // verify that internet is connected, remote exists and branch exists
    await git.checkRemoteConnects(config.repo).catch((error: Error) => {
      return {
        type: 'FailedToConnectToGitRepo',
        message: error.message,
      }
    })

    // TODO if remote not already set
    await git.setupCodeRoadRemote(config.repo.uri).catch((error: Error) => {
      return {
        type: 'GitRemoteAlreadyExists',
        message: error.message,
      }
    })
  }

  await vscode.commands.executeCommand(COMMANDS.CONFIG_TEST_RUNNER, config.testRunner)

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

export default tutorialConfig
