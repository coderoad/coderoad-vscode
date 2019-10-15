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

	// allow multiple coding languages in a tutorial
	const languages: string[] = config.codingLanguages.map((lang: G.CodingLanguage) => lang.toLowerCase())

	// setup onSave hook
	vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
		// @ts-ignore // issue with GQL enums in TS
		if (document.uri.scheme === 'file' && languages.includes(document.languageId)) {
			vscode.commands.executeCommand('coderoad.run_test')
		}
	})
}

export default tutorialConfig