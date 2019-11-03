import * as G from 'typings/graphql'
import * as vscode from 'vscode'
import * as git from '../services/git'

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

	// setup onSave hook
	vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
		const fileFormat: string = document.languageId.toUpperCase()
		// @ts-ignore warning on enums when validating a file format match
		if (document.uri.scheme === 'file' && config.fileFormats.includes(fileFormat)) {
			vscode.commands.executeCommand('coderoad.run_test')
		}
	})
}

export default tutorialConfig