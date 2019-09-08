import * as path from 'path'
import * as CR from 'typings'
import * as vscode from 'vscode'
import {tutorialModel} from '../extension'

const getNonce = (): string => {
	let text = ''
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}


// Manages webview panel
class ReactWebView {
	// @ts-ignore
	public loaded: boolean
	private panel: vscode.WebviewPanel
	private extensionPath: string
	private disposables: vscode.Disposable[] = []

	public constructor(extensionPath: string) {
		this.extensionPath = extensionPath

		// Create and show a new webview panel
		this.panel = this.createWebviewPanel(vscode.ViewColumn.Two)

		// Set the webview initial html content
		this.panel.webview.html = this.getHtmlForWebview()

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this.panel.onDidDispose(this.dispose, this, this.disposables)

		// Handle messages from the webview
		const onReceive = (action: string | CR.Action) => {
			const actionType: string = typeof action === 'string' ? action : action.type
			switch (actionType) {
				case 'TUTORIAL_START':
					if (typeof action === 'string' || !action.payload || !action.payload.id) {
						throw new Error('No tutorial id on tutorial start action')
					}
					tutorialModel.launch(action.payload.id)
					break
				// add other cases
				default:
					// send to state machine
					console.log('onReceive', action)
					vscode.commands.executeCommand('coderoad.receive_machine_action', action)
			}
		}
		this.panel.webview.onDidReceiveMessage(onReceive, null, this.disposables)

		// update panel on changes
		const updateWindows = () => {
			vscode.commands.executeCommand('vscode.setEditorLayout', {
				orientation: 0,
				groups: [{groups: [{}], size: 0.6}, {groups: [{}], size: 0.4}],
			})
		}

		// prevents new panels from going on top of coderoad panel
		vscode.window.onDidChangeActiveTextEditor((textEditor?: vscode.TextEditor) => {
			console.log('onDidChangeActiveTextEditor')
			console.log(textEditor)
			if (!textEditor || textEditor.viewColumn !== vscode.ViewColumn.Two) {
				updateWindows()
			}
		})
		// // prevents moving coderoad panel on top of left panel
		vscode.window.onDidChangeVisibleTextEditors((textEditor: vscode.TextEditor[]) => {
			console.log('onDidChangeVisibleTextEditors')
			updateWindows()
		})

		// TODO: prevent window from moving to the left when no windows remain on rights
	}

	public createOrShow(column: number): void {
		// If we already have a panel, show it.
		// Otherwise, create a new panel.
		if (this.panel && this.panel.webview) {
			this.panel.reveal(column)
		} else {
			this.panel = this.createWebviewPanel(column)
		}
	}

	public async postMessage(action: CR.Action): Promise<void> {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		const success = await this.panel.webview.postMessage(action)
		if (!success) {
			throw new Error(`Message post failure: ${JSON.stringify(action)}`)
		}
	}

	private async dispose(): Promise<void> {
		// Clean up our resources
		this.loaded = false
		this.panel.dispose()
		Promise.all(this.disposables.map((x) => x.dispose()))
	}

	private createWebviewPanel(column: number): vscode.WebviewPanel {
		const viewType = 'CodeRoad'
		const title = 'CodeRoad'
		const config = {
			// Enable javascript in the webview
			enableScripts: true,
			// And restrict the webview to only loading content from our extension's `media` directory.
			localResourceRoots: [vscode.Uri.file(path.join(this.extensionPath, 'build'))],
			// prevents destroying the window when it is in the background
			retainContextWhenHidden: true,
		}
		return vscode.window.createWebviewPanel(viewType, title, column, config)
	}

	private getHtmlForWebview(): string {
		const buildUri = vscode.Uri.file(path.join(this.extensionPath, 'build')).with({scheme: 'vscode-resource'})

		const manifest = require(path.join(this.extensionPath, 'build', 'asset-manifest.json'))

		const getSrc = (manifestName: string): any => {
			const file = manifest.files[manifestName]
			const uriPath = vscode.Uri.file(path.join(this.extensionPath, 'build', file))
			return uriPath.with({scheme: 'vscode-resource'})
		}

		const styles = [
			'main.css',
			// get style chunk
			Object.keys(manifest.files).find(f => f.match(/^static\/css\/.+\.css$/)) || ''
		].map(style => getSrc(style))

		// map over scripts
		const scripts = [{
			file: './webpackBuild.js',
		}, {
			manifest: 'runtime~main.js',
		}, {
			manifest: 'main.js',
		}, {
			// get js chunk
			manifest: Object.keys(manifest.files).find(f => f.match(/^static\/js\/.+\.js$/)),
		}].map(script => ({
			nonce: getNonce(),
			src: script.manifest ? getSrc(script.manifest) : script.file
		}))

		const indexHtml = `<!DOCTYPE html>
			<html lang='en'>
				<head>
						<meta charset='utf-8'>
						<meta name='viewport' content='width=device-width,initial-scale=1,shrink-to-fit=no'>
						<meta name='theme-color' content='#000000'>
						<meta http-equiv='Content-Security-Policy' content="font-src vscode-resource://*; img-src vscode-resource: https:; script-src ${scripts.map(script => `'nonce-${script.nonce}'`).join(' ')}; style-src vscode-resource: 'unsafe-inline' http: https: data:;">
						<title>React App</title>

						<link rel='manifest' href='./manifest.json' />
						<link rel='stylesheet' href='https://unpkg.com/@alifd/next/dist/next.css' />
						${styles.map(styleUri => `<link rel='stylesheet' type='text/css' href='${styleUri}'>`).join('\n')}
						
						<base href='${buildUri}/'>
				</head>

				<body>
						<noscript>You need to enable JavaScript to run this app.</noscript>
						<div id='root' style='background-color:white; padding: 1rem;'>Loading...</div>
						${scripts.map(s => `<script nonce='${s.nonce}' src='${s.src}'></script>`).join('\n')}
				</body>
		</html>`

		return indexHtml
	}

}

export default ReactWebView
