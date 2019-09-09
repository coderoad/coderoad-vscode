import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import node from '../services/node'

export async function isEmptyWorkspace(): Promise<boolean> {
	const {stdout, stderr} = await node.exec('ls')
	if (stderr) {
		throw new Error('Error validating if project is empty')
	}
	return !stdout.length
}

// // TODO: workspace change listener
export async function openReadme(): Promise<void> {
	const {stderr} = await node.exec('ls')
	if (stderr) {
		throw new Error('Error looking for initial file')
	}

	const file = 'README.md'
	const filePath = path.join(vscode.workspace.rootPath || '', file)
	console.log('filePath', filePath)
	const hasReadme = await node.exists(file)

	if (!hasReadme) {
		// add readme if none exists
		try {
			const content = '# Welcome to CodeRoad!'
			fs.writeFileSync(filePath, content, 'utf8')
		} catch (error) {
			throw new Error('Error writing README.md')
		}
	}

	try {
		const openPath = vscode.Uri.parse(filePath)
		const doc = await vscode.workspace.openTextDocument(openPath)
		await vscode.window.showTextDocument(doc)
	} catch (error) {
		throw new Error('Error opening README doc')
	}
}
