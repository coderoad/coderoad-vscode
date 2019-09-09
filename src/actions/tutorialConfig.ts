import * as G from 'typings/graphql'
import * as vscode from 'vscode'
import * as git from '../services/git'

const tutorialConfig = async (tutorial: G.Tutorial) => {

	// setup git, add remote
	await git.initIfNotExists()
	await git.setupRemote(tutorial.repo.uri)

	// TODO: allow multiple coding languages in a tutorial

	// setup onSave hook
	// console.log(`languageIds: ${languageIds.join(', ')}`)
	vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
		if (document.uri.scheme === 'file' && tutorial.codingLanguage === document.languageId) {
			// do work
			// TODO: resolve issue if client unaware or out of sync with running test
			vscode.commands.executeCommand('coderoad.run_test')
		}
	})

	console.log('configured')
}

export default tutorialConfig