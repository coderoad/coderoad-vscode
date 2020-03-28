import * as T from 'typings'
import * as G from 'typings/graphql'
import * as vscode from 'vscode'
import { COMMANDS } from '../editor/commands'
import languageMap from '../editor/languageMap'
import * as git from '../services/git'
import onError from '../services/sentry/onError'

interface TutorialConfigParams {
  config: T.TutorialConfig
  alreadyConfigured?: boolean
  onComplete?(): void
}

const tutorialConfig = async (
  { config, alreadyConfigured }: TutorialConfigParams,
  handleError: (msg: T.ErrorMessage) => void,
) => {
  if (!alreadyConfigured) {
    // setup git, add remote
    await git.initIfNotExists().catch((error) => {
      onError(new Error('Git not found'))
      // failed to setup git
      handleError({
        title: error.message,
        description:
          'Be sure you install Git. See the docs for help https://git-scm.com/book/en/v2/Getting-Started-Installing-Git',
      })
    })

    // TODO if remote not already set
    await git.setupRemote(config.repo.uri).catch((error) => {
      onError(error)
      handleError({ title: error.message, description: 'Remove your current Git project and restarting' })
    })
  }

  vscode.commands.executeCommand(COMMANDS.CONFIG_TEST_RUNNER, config.testRunner)

  const fileFormats = config.testRunner.fileFormats

  // verify if file test should run based on document saved
  const shouldRunTest = (document: vscode.TextDocument): boolean => {
    // must be a file
    if (document.uri.scheme !== 'file') {
      return false
    }
    // must configure with file formatss
    if (fileFormats && fileFormats.length) {
      const fileFormat: G.FileFormat = languageMap[document.languageId]
      if (!fileFormats.includes(fileFormat)) {
        return false
      }
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
