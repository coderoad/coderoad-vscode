import * as G from 'typings/graphql'
import {join} from 'path'
import * as vscode from 'vscode'
import * as git from '../services/git'
import node from '../services/node'

interface ErrorMessageFilter {
	[lang: string]: {
		[key: string]: string
	}
}

// TODO: should be loaded on startup based on language
const commandErrorMessageFilter: ErrorMessageFilter = {
	JAVASCRIPT: {
		'node-gyp': 'Error running npm setup command'
	}
}


// TODO: pass command and command name down for filtering. Eg. JAVASCRIPT, 'npm install'
const runCommands = async (commands: string[], language: string = 'JAVASCRIPT') => {
	for (const command of commands) {
		const {stdout, stderr} = await node.exec(command)
		if (stderr) {
			console.error(stderr)
			// language specific error messages from running commands
			const filteredMessages = Object.keys(commandErrorMessageFilter[language])
			for (const message of filteredMessages) {
				if (stderr.match(message)) {
					// ignored error
					throw new Error('Error running setup command')
				}
			}
		}
		console.log(`run command: ${command}`, stdout)
	}
}

// collect active file watchers (listeners)
const watchers: {[key: string]: vscode.FileSystemWatcher} = {}

const disposeWatcher = (listener: string) => {
	watchers[listener].dispose()
	delete watchers[listener]
}

const setupActions = async (workspaceRoot: vscode.WorkspaceFolder, {commands, commits, files, listeners}: G.StepActions): Promise<void> => {
	// run commits
	if (commits) {
		for (const commit of commits) {
			await git.loadCommit(commit)
		}
	}

	// run file watchers (listeners)
	if (listeners) {
		for (const listener of listeners) {
			if (!watchers[listener]) {
				const pattern = new vscode.RelativePattern(
					vscode.workspace.getWorkspaceFolder(workspaceRoot.uri)!,
					listener
				)
				watchers[listener] = vscode.workspace.createFileSystemWatcher(
					pattern
				)
				watchers[listener].onDidChange(() => {
					// trigger save
					vscode.commands.executeCommand('coderoad.run_test', null, () => {
						// cleanup watcher on success
						disposeWatcher(listener)
					})
				})
			}
		}
	} else {
		// remove all watchers
		for (const listener of Object.keys(watchers)) {
			disposeWatcher(listener)
		}
	}

	// run command
	if (commands) {
		await runCommands(commands)
	}

	// open files
	if (files) {
		for (const filePath of files) {
			try {
				// TODO: figure out why this does not work
				// 	try {
				// 		const absoluteFilePath = join(workspaceRoot.uri.path, filePath)
				// 		const doc = await vscode.workspace.openTextDocument(absoluteFilePath)
				// 		await vscode.window.showTextDocument(doc, vscode.ViewColumn.One)
				// 		// there are times when initialization leave the panel behind any files opened
				// 		// ensure the panel is redrawn on the right side first
				// 		// webview.createOrShow()
				// 	} catch (error) {
				// 		console.log(`Failed to open file ${filePath}`, error)
				// 	}
				const wr = vscode.workspace.rootPath
				if (!wr) {
					throw new Error('No workspace root path')
				}
				const absoluteFilePath = join(wr, filePath)
				const doc = await vscode.workspace.openTextDocument(absoluteFilePath)
				await vscode.window.showTextDocument(doc, vscode.ViewColumn.One)
				// there are times when initialization leave the panel behind any files opened
				// ensure the panel is redrawn on the right side first
				vscode.commands.executeCommand('coderoad.open_webview')
			} catch (error) {
				console.log(`Failed to open file ${filePath}`, error)
			}
		}
	}
}

export default setupActions


