import * as G from 'typings/graphql'
import * as vscode from 'vscode'
import * as git from '../services/git'
import langaugeMap from '../editor/languageMap'

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
		const fileFormat: G.FileFormat = langaugeMap[document.languageId]
		if (document.uri.scheme === 'file' && config.fileFormats.includes(fileFormat)) {
			vscode.commands.executeCommand('coderoad.run_test')
		}
	})
}

export default tutorialConfig