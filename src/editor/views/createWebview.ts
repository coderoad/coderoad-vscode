import * as vscode from 'vscode'
import * as CR from 'typings'
import * as path from 'path'

import getNonce from './utils/nonce'
import onReceive from './onReceive'

/**
 * Manages React webview panels
 */
class ReactPanel {
    /**
     * Track the currently panel. Only allow a single panel to exist at a time.
     */
    public static currentPanel: ReactPanel | undefined = undefined

    private readonly _panel: vscode.WebviewPanel
    private readonly _extensionPath: string
    private _disposables: vscode.Disposable[] = []

    public static async createOrShow(extensionPath: string): Promise<void> {
        const hasActiveEditor = vscode.window.activeTextEditor

        // if (!hasActiveEditor) {
        //     throw new Error('Should have an open file on launch')
        // }
        const column = vscode.ViewColumn.One

        // If we already have a panel, show it.
        // Otherwise, create a new panel.
        if (ReactPanel.currentPanel) {
            ReactPanel.currentPanel._panel.reveal(column)
        } else {
            ReactPanel.currentPanel = new ReactPanel(extensionPath, column)
        }
    }

    private constructor(extensionPath: string, column: vscode.ViewColumn) {
        this._extensionPath = extensionPath

        const viewType = 'CodeRoad'
        const title = 'CodeRoad'
        const config = {
            // Enable javascript in the webview
            enableScripts: true,

            // And restric the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [vscode.Uri.file(path.join(this._extensionPath, 'build'))],

            // prevents destroying the window when it is in the background
            retainContextWhenHidden: true,
        }

        // Create and show a new webview panel
        this._panel = vscode.window.createWebviewPanel(viewType, title, column, config)

        // Set the webview's initial html content
        this._panel.webview.html = this._getHtmlForWebview()

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables)

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(onReceive, null, this._disposables)
    }

    public async postMessage(action: CR.Action): Promise<void> {
        // Send a message to the webview webview.
        // You can send any JSON serializable data.
        const success = await this._panel.webview.postMessage(action)
        if (!success) {
            throw new Error(`Message post failure: ${JSON.stringify(action)}`)
        }
    }

    public dispose(): void {
        ReactPanel.currentPanel = undefined

        // Clean up our resources
        this._panel.dispose()

        while (this._disposables.length) {
            const x = this._disposables.pop()
            if (x) {
                x.dispose()
            }
        }
    }

    private _getHtmlForWebview(): string {
        // eslint-disable-next-line
        const manifest = require(path.join(this._extensionPath, 'build', 'asset-manifest.json'))
        const mainScript = manifest['main.js']
        const mainStyle = manifest['main.css']

        const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainScript))
        const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' })
        const stylePathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainStyle))
        const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' })

        // Use a nonce to whitelist which scripts can be run
        const nonce = getNonce()

        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>React App</title>
				<link rel="stylesheet" type="text/css" href="${styleUri}">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
        <base href="${vscode.Uri.file(path.join(this._extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">
        <style></style>
			</head>

			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root">Loading...</div>
				
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`
    }
}

export default ReactPanel
