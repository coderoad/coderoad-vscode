import * as G from 'typings/graphql'
import * as vscode from 'vscode'
import * as git from '../services/git'

interface TutorialConfigParams {
	tutorial: G.Tutorial,
	alreadyConfigured?: boolean
	onComplete?(): void
}

const tutorialConfig = async ({tutorial, alreadyConfigured, onComplete}: TutorialConfigParams) => {
	console.log('---------- tutorialConfig -----------')
	if (!alreadyConfigured) {
		// setup git, add remote
		await git.initIfNotExists()

		// TODO: if remote not already set
		await git.setupRemote(tutorial.repo.uri)
		if (onComplete) {onComplete()}
	}

	// TODO: allow multiple coding languages in a tutorial
	const language = tutorial.codingLanguage.toLowerCase()

	// setup onSave hook
	vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
		if (document.uri.scheme === 'file' && language === document.languageId) {
			vscode.commands.executeCommand('coderoad.run_test')
		}
	})
}

export default tutorialConfig