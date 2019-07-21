import * as path from 'path'
import * as CR from 'typings'
import * as vscode from 'vscode'

/**
 * Manages React webview panels
 */
class ReactWebView {
  // @ts-ignore
  public loaded: boolean
  private panel: vscode.WebviewPanel
  private extensionPath: string
  private disposables: vscode.Disposable[] = []
  private onReceive: any // TODO: properly type

  public constructor(extensionPath: string) {
    this.extensionPath = extensionPath

    // Create and show a new webview panel
    this.panel = this.createWebviewPanel(vscode.ViewColumn.Two)

    // Set the webview's initial html content
    this.panel.webview.html = this.getHtmlForWebview()

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this.panel.onDidDispose(this.dispose, this, this.disposables)

    // Handle messages from the webview
    const onReceive = (action: string | CR.Action) => {
      // await loading of webview in React before proceeding with loaded state
      if (action === 'WEBVIEW_LOADED') {
        this.loaded = true
      } else {
        vscode.commands.executeCommand('coderoad.receive_action', action)
      }
    }
    this.panel.webview.onDidReceiveMessage(onReceive, null, this.disposables)

    // update panel on changes
    const updateWindows = () => {
      vscode.commands.executeCommand('vscode.setEditorLayout', {
        orientation: 0,
        groups: [{ groups: [{}], size: 0.6 }, { groups: [{}], size: 0.4 }],
      })
    }

    // prevents new panels from going ontop of coderoad panel
    vscode.window.onDidChangeActiveTextEditor((textEditor) => {
      console.log('onDidChangeActiveTextEditor')
      console.log(textEditor)
      if (!textEditor || textEditor.viewColumn !== vscode.ViewColumn.Two) {
        updateWindows()
      }
    })
    // // prevents moving coderoad panel on top of left panel
    vscode.window.onDidChangeVisibleTextEditors((textEditor) => {
      console.log('onDidChangeVisibleTextEditors')
      updateWindows()
    })

    // TODO: prevent window from moving to the left when no windows remain on rights
  }

  public createOrShow(column: number, callback?: () => void): void {
    // If we already have a panel, show it.
    // Otherwise, create a new panel.
    if (this.panel && this.panel.webview) {
      this.panel.reveal(column)
    } else {
      this.panel = this.createWebviewPanel(column)
    }
    if (callback) {
      // listen for when webview is loaded
      // unfortunately there is no easy way of doing this
      const webPanelListener = setInterval(() => {
        if (this.loaded) {
          // callback tells editor the webview has loaded
          setTimeout(callback)
          clearInterval(webPanelListener)
        }
      }, 200)
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
    const [n1, n2, n3] = [1, 2, 3].map(this.getNonce)

    return `<!DOCTYPE html>
			<html lang='en'>
                <head>
                    <meta charset='utf-8'>
                    <meta name='viewport' content='width=device-width,initial-scale=1,shrink-to-fit=no'>
                    <meta name='theme-color' content='#000000'>
                    <title>React App</title>
                    <link rel='manifest' href='./manifest.json' />

                    <!-- TODO: load styles through package -->
                    <link rel='stylesheet' href='https://unpkg.com/@alifd/next/dist/next.css' />
                    <link rel='stylesheet' type='text/css' href='${styleUri}'>

                    <meta http-equiv='Content-Security-Policy' content="font-src *; img-src vscode-resource: https:; script-src 'nonce-${n1}' 'nonce-${n2}' 'nonce-${n3}'; style-src vscode-resource: 'unsafe-inline' http: https: data:;">
                    <base href='${vscode.Uri.file(path.join(this.extensionPath, 'build')).with({
      scheme: 'vscode-resource',
    })}/'>
                </head>

                <body>
                    <noscript>You need to enable JavaScript to run this app.</noscript>
                    <div id='root'>Loading...</div>
                    <script nonce=${n1} src='./webpackBuild.js'></script>
                    <script nonce=${n2} src='${chunkUri}'></script>
                    <script nonce='${n3}' src='${scriptUri}'></script>
                </body>
            </html>`
  }
}

export default ReactWebView
