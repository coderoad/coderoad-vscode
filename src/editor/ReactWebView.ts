import * as vscode from 'vscode'
import * as CR from 'typings'
import * as path from 'path'

/**
 * Manages React webview panels
 */
class ReactWebView {
    // @ts-ignore
    private panel: vscode.WebviewPanel
    private extensionPath: string
    private disposables: vscode.Disposable[] = []
    private onReceive: any // TODO: properly type

    public constructor(extensionPath: string) {
        this.extensionPath = extensionPath

        // Create and show a new webview panel
        this.panel = this.createWebviewPanel(vscode.ViewColumn.One)

        // Set the webview's initial html content
        this.panel.webview.html = this.getHtmlForWebview()

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this.panel.onDidDispose(() => this.dispose(), null, this.disposables)

        // Handle messages from the webview
        const onReceive = (action: string | CR.Action) => vscode.commands.executeCommand('coderoad.receive_action', action)
        this.panel.webview.onDidReceiveMessage(onReceive, null, this.disposables)
        console.log('webview loaded')
    }

    public async createOrShow(column: number): Promise<void> {
        // If we already have a panel, show it.
        // Otherwise, create a new panel.
        if (this.panel && this.panel.webview) {
            console.log('reveal')
            this.panel.reveal(column)
        } else {
            console.log('make new panel')
            this.panel = this.createWebviewPanel(column)

        }
    }

    private createWebviewPanel(column: number): vscode.WebviewPanel {
        const viewType = 'CodeRoad'
        const title = 'CodeRoad'
        const config = {
            // Enable javascript in the webview
            enableScripts: true,
            // And restric the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [vscode.Uri.file(path.join(this.extensionPath, 'build'))],
            // prevents destroying the window when it is in the background
            retainContextWhenHidden: true,
        }
        return vscode.window.createWebviewPanel(viewType, title, column, config)
    }

    private getNonce(): string {
        let text = ''
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
    }

    public async postMessage(action: CR.Action): Promise<void> {
        console.log('webview postMessage')
        console.log(action)
        // Send a message to the webview webview.
        // You can send any JSON serializable data.
        const success = await this.panel.webview.postMessage(action)
        if (!success) {
            throw new Error(`Message post failure: ${JSON.stringify(action)}`)
        }
        console.log('postMessage sent')
    }

    public dispose(): void {
        // Clean up our resources
        this.panel.dispose()

        while (this.disposables.length) {
            const x = this.disposables.pop()
            if (x) {
                x.dispose()
            }
        }
    }

    private getHtmlForWebview(): string {

        // eslint-disable-next-line
        const manifest = require(path.join(this.extensionPath, 'build', 'asset-manifest.json'))
        const mainScript = manifest.files['main.js']
        // grab first chunk
        const chunk = Object.keys(manifest.files).filter(f => f.match(/^static\/js\/.+\.js$/))[0]
        const chunkScript = manifest.files[chunk]
        const mainStyle = manifest.files['main.css']

        const scriptPathOnDisk = vscode.Uri.file(path.join(this.extensionPath, 'build', mainScript))
        const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' })
        const chunkPathOnDisk = vscode.Uri.file(path.join(this.extensionPath, 'build', chunkScript))
        const chunkUri = chunkPathOnDisk.with({ scheme: 'vscode-resource' })
        const stylePathOnDisk = vscode.Uri.file(path.join(this.extensionPath, 'build', mainStyle))
        const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' })

        // Use a nonce to whitelist which scripts can be run
        const nonce = this.getNonce()
        const nonce2 = this.getNonce()
        const nonce3 = this.getNonce()

        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
                <meta name="theme-color" content="#000000">
                <title>React App</title>
                <link rel="manifest" href="./manifest.json" />
				<link rel="stylesheet" type="text/css" href="${styleUri}">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}' 'nonce-${nonce2}' 'nonce-${nonce3}'; style-src vscode-resource: 'unsafe-inline' http: https: data:;">
                <base href="${vscode.Uri.file(path.join(this.extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">
                <style></style>
			</head>

			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root">Loading...</div>
                <script nonce=${nonce} src="./webpackBuild.js"></script>
                <script nonce=${nonce2} src="${chunkUri}"></script>
                <script nonce="${nonce3}" src="${scriptUri}"></script>
			</body>
            </html>`
    }
}

export default ReactWebView
