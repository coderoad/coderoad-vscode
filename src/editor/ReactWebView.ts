import {Action} from 'typings'
import * as path from 'path'
import * as vscode from 'vscode'
import {JSDOM} from 'jsdom'
import Channel from '../channel'

const getNonce = (): string => {
	let text = ''
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

interface ReactWebViewProps {
	extensionPath: string
	workspaceState: vscode.Memento
}


// Manages webview panel
class ReactWebView {
	// @ts-ignore
	public loaded: boolean

	public send: Channel['send']
	private panel: vscode.WebviewPanel
	private extensionPath: string
	private disposables: vscode.Disposable[] = []
	private channel: Channel

	public constructor({extensionPath, workspaceState}: ReactWebViewProps) {
		console.log(`extPath ${extensionPath}`)
		this.extensionPath = extensionPath

		// Create and show a new webview panel
		this.panel = this.createWebviewPanel(vscode.ViewColumn.Two)

		// Set the webview initial html content
		this.render().then((html: string) => {
			this.panel.webview.html = html
			// Listen for when the panel is disposed
			// This happens when the user closes the panel or when the panel is closed programmatically
			this.panel.onDidDispose(this.dispose, this, this.disposables)


			// update panel on changes
			const updateWindows = () => {
				vscode.commands.executeCommand('vscode.setEditorLayout', {
					orientation: 0,
					groups: [{groups: [{}], size: 0.6}, {groups: [{}], size: 0.4}],
				})
			}

			// prevents new panels from going on top of coderoad panel
			vscode.window.onDidChangeActiveTextEditor((textEditor?: vscode.TextEditor) => {
				// console.log('onDidChangeActiveTextEditor')
				// console.log(textEditor)
				if (!textEditor || textEditor.viewColumn !== vscode.ViewColumn.Two) {
					updateWindows()
				}
			})
			// // prevents moving coderoad panel on top of left panel
			vscode.window.onDidChangeVisibleTextEditors((textEditor: vscode.TextEditor[]) => {
				// console.log('onDidChangeVisibleTextEditors')
				updateWindows()
			})

			// TODO: prevent window from moving to the left when no windows remain on rights
		})

		// channel connects webview to the editor
		this.channel = new Channel({
			workspaceState,
			postMessage: (action: Action): Thenable<boolean> => {
				return this.panel.webview.postMessage(action)
			}
		})
		// Handle messages from the webview
		const receive = this.channel.receive
		this.panel.webview.onDidReceiveMessage(receive, null, this.disposables)
		this.send = this.channel.send
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

	private async dispose(): Promise<void> {
		// Clean up our resources
		this.loaded = false
		this.panel.dispose()
		Promise.all(this.disposables.map((x) => x.dispose()))
	}

	private createWebviewPanel = (column: number): vscode.WebviewPanel => {
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

	private render = async (): Promise<string> => {

		const dom = await JSDOM.fromFile('./build/index.html')

		const {document} = dom.window

		const base: HTMLBaseElement = document.createElement('base')
		base.href = vscode.Uri.file(path.join(this.extensionPath, 'build')).with({scheme: 'vscode-resource'}).path
		document.head.appendChild(base)

		const manifest = require(path.join(this.extensionPath, 'build', 'asset-manifest.json'))

		const nonces: string[] = []

		const scripts: HTMLScriptElement[] = Array.from(document.getElementsByTagName('script'))
		for (const script of scripts) {
			const nonce: string = getNonce()
			nonces.push(nonce)
			script.nonce = nonce
			const uriPath = vscode.Uri.file(path.join(this.extensionPath, 'build', script.src))
			uriPath.with({scheme: 'vscode-resource'})
		}

		// add run-time script from webpack
		const runTimeScript = document.createElement('script')
		runTimeScript.src = manifest.files['runtime-main.js']
		runTimeScript.nonce = getNonce()
		nonces.push(runTimeScript.nonce)
		vscode.Uri.file(path.join(this.extensionPath, 'build', runTimeScript.src)).with({scheme: 'vscode-resource'})
		document.body.appendChild(runTimeScript)

		const styles: HTMLLinkElement[] = Array.from(document.getElementsByTagName('link'))
		for (const style of styles) {
			if (style.href) {
				const uriPath = vscode.Uri.file(path.join(this.extensionPath, 'build', style.href))
				uriPath.with({scheme: 'vscode-resource'})
			}
		}


		// content security policy
		const cspMeta: HTMLMetaElement = document.createElement('meta')
		cspMeta.httpEquiv = 'Content-Security-Policy'
		cspMeta.content = [
			`default-src 'none';`,
			'font-src vscode-resource://*;',
			'img-src vscode-resource: https:;',
			`script-src ${nonces.map(nonce => `'nonce-${nonce}'`).join(' ')};`,
			`style-src 'unsafe-inline' vscode-resource: http: https: data:;`
		].join(' ')
		document.head.appendChild(cspMeta)


		const html = dom.serialize()

		console.log(html)

		return html
	}

}

export default ReactWebView
