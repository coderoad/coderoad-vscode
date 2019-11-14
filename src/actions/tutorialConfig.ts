import * as G from 'typings/graphql'
import * as vscode from 'vscode'
import * as git from '../services/git'
import languageMap from '../editor/languageMap'

interface TutorialConfigParams {
	config: G.TutorialConfig,
	alreadyConfigured?: boolean
	onComplete?(): void
}


const tutorialConfig = async ({config, alreadyConfigured, }: TutorialConfigParams) => {
	if (!alreadyConfigured) {
		// setup git, add remote
		await git.initIfNotExists()

		// TODO: if remote not already set
		await git.setupRemote(config.repo.uri)
	}

	vscode.commands.executeCommand('coderoad.config_test_runner', config.testRunner)

	const fileFormats = config.testRunner.fileFormats

	// verify if file test should run based on document saved
	const shouldRun = (document: vscode.TextDocument): boolean => {
		if (document.uri.scheme !== 'file') {
			return false
		}
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
		if (shouldRun(document)) {
			vscode.commands.executeCommand('coderoad.run_test')
		}
	})
}

export default tutorialConfig