import * as G from 'typings/graphql'
import * as vscode from 'vscode'
import * as git from '../services/git'

interface TutorialConfigParams {
	tutorial: G.Tutorial,
	alreadyConfigured?: boolean
}

const tutorialConfig = async ({tutorial, alreadyConfigured}: TutorialConfigParams) => {
	if (!alreadyConfigured) {
		// setup git, add remote
		await git.initIfNotExists()

		// TODO: if remote not already set
		await git.setupRemote(tutorial.repo.uri)
	}

	// TODO: allow multiple coding languages in a tutorial
	const language = tutorial.codingLanguage.toLowerCase()

	// setup onSave hook
	// console.log(`languageIds: ${languageIds.join(', ')}`)
	vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
		if (document.uri.scheme === 'file' && language === document.languageId) {
			vscode.commands.executeCommand('coderoad.run_test')
		}
	})
}

export default tutorialConfig