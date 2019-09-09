import * as fs from 'fs'
import {join} from 'path'
import {exec as cpExec} from 'child_process'
import {promisify} from 'util'
import * as vscode from 'vscode'

const asyncExec = promisify(cpExec)

class Node {
	private workspaceRoot: string
	constructor() {
		this.workspaceRoot = vscode.workspace.rootPath || ''
		if (!this.workspaceRoot.length) {
			throw new Error('Invalid workspaceRoot')
		}
		console.log(`workspaceRoot: ${this.workspaceRoot}`)
	}
	public exec = (cmd: string): Promise<{stdout: string; stderr: string}> => asyncExec(cmd, {
		cwd: this.workspaceRoot,
	})

	public exists = (...paths: string[]): boolean => fs.existsSync(join(this.workspaceRoot, ...paths))
}

export default new Node()
