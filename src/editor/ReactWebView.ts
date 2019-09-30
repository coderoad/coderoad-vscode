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
	workspaceRoot: vscode.WorkspaceFolder
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

	public constructor({extensionPath, workspaceState, workspaceRoot}: ReactWebViewProps) {
		this.extensionPath = extensionPath

		// Create and show a new webview panel
		this.panel = this.createWebviewPanel()

		// Set the webview initial html content
		this.render()

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programmatically
		this.panel.onDidDispose(this.dispose, this, this.disposables)


		// update panel on changes
		// const updateWindows = () => {
		// 	vscode.commands.executeCommand('coderoad.open_webview')
		// }

		// // // prevents moving coderoad panel on top of left panel
		// vscode.window.onDidChangeVisibleTextEditors((textEditors: vscode.TextEditor[]) => {
		// 	console.log('onDidChangeVisibleTextEditors')
		// 	console.log(textEditors)
		// 	// updateWindows()
		// })

		// TODO: prevent window from moving to the left when no windows remain on rights

		// channel connects webview to the editor
		this.channel = new Channel({
			workspaceState,
			workspaceRoot,
			postMessage: (action: Action): Thenable<boolean> => {
				// console.log(`postMessage ${JSON.stringify(action)}`)
				return this.panel.webview.postMessage(action)
			}
		})
		// Handle messages from the webview
		const receive = this.channel.receive
		this.panel.webview.onDidReceiveMessage(receive, null, this.disposables)
		this.send = this.channel.send
	}

	public createOrShow(): void {
		vscode.commands.executeCommand('vscode.setEditorLayout', {
			orientation: 0,
			groups: [{groups: [{}], size: 0.6}, {groups: [{}], size: 0.4}],
		})
		// If we already have a panel, show it.
		// Otherwise, create a new panel.

		if (this.panel && this.panel.webview) {
			if (!this.loaded) {
				this.panel.reveal(vscode.ViewColumn.Two)
				this.loaded = true
			}
		} else {
			this.panel = this.createWebviewPanel()
		}
	}

	private async dispose(): Promise<void> {
		// Clean up our resources
		this.loaded = false
		this.panel.dispose()
		Promise.all(this.disposables.map((x) => x.dispose()))
	}

	private createWebviewPanel = (): vscode.WebviewPanel => {
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
		this.loaded = true
		return vscode.window.createWebviewPanel(viewType, title, vscode.ViewColumn.Two, config)
	}

	private render = async (): Promise<void> => {
		// path to build directory
		const rootPath = path.join(this.extensionPath, 'build')

		// load copied index.html from web app build
		const dom = await JSDOM.fromFile(path.join(rootPath, 'index.html'))
		const {document} = dom.window

		// set base href
		const base: HTMLBaseElement = document.createElement('base')
		base.href = vscode.Uri.file(rootPath).with({scheme: 'vscode-resource'}).toString() + '/'
		document.head.appendChild(base)

		// used for CSP
		const nonces: string[] = []

		// generate vscode-resource build path uri
		const createUri = (filePath: string): string =>
			vscode.Uri.file(filePath).with({scheme: 'vscode-resource'}).toString()
				.replace(/^\/+/g, '') // remove leading '/'
				.replace('/vscode-resource%3A', rootPath) // replace mangled resource path with root

		// fix paths for scripts
		const scripts: HTMLScriptElement[] = Array.from(document.getElementsByTagName('script'))
		for (const script of scripts) {
			if (script.src) {
				const nonce: string = getNonce()
				nonces.push(nonce)
				script.nonce = nonce
				script.src = createUri(script.src)
			}
		}

		// add run-time script from webpack
		const runTimeScript = document.createElement('script')
		runTimeScript.nonce = getNonce()
		nonces.push(runTimeScript.nonce)
		const manifest = require(path.join(rootPath, 'asset-manifest.json'))
		runTimeScript.src = createUri(path.join(rootPath, manifest.files['runtime-main.js']))
		document.body.appendChild(runTimeScript)

		// fix paths for links
		const styles: HTMLLinkElement[] = Array.from(document.getElementsByTagName('link'))
		for (const style of styles) {
			if (style.href) {
				style.href = createUri(style.href)
			}
		}


		// set CSP (content security policy) to grant permission to local files
		const cspMeta: HTMLMetaElement = document.createElement('meta')
		cspMeta.httpEquiv = 'Content-Security-Policy'
		cspMeta.content = [
			'font-src vscode-resource://*;',
			'img-src vscode-resource: https:;',
			`script-src ${nonces.map(nonce => `'nonce-${nonce}'`).join(' ')};`,
			`style-src 'unsafe-inline' vscode-resource: http: https: data:;`
		].join(' ')
		document.head.appendChild(cspMeta)

		// stringify dom
		const html = dom.serialize()

		// set view
		this.panel.webview.html = html
	}

}

export default ReactWebView
