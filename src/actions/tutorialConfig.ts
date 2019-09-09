import * as G from 'typings/graphql'
import * as vscode from 'vscode'
import * as git from '../services/git'

const tutorialConfig = async (tutorial: G.Tutorial) => {

	// setup git, add remote
	await git.initIfNotExists()
	await git.setupRemote(tutorial.repo.uri)

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