import * as T from 'typings'
import * as path from 'path'
import * as vscode from 'vscode'
import render from './render'

interface ReactWebViewProps {
  extensionPath: string
  channel: any
}

interface Output {
  state: { loaded: boolean }
  createOrShow(): void
  send: T.Send
  receive: T.Send
}

const state = { loaded: false }

const createReactWebView = ({ extensionPath, channel }: ReactWebViewProps): Output => {
  // TODO add disposables
  const disposables: vscode.Disposable[] = []

  function createWebViewPanel(): vscode.WebviewPanel {
    const viewType = 'CodeRoad'
    const title = 'CodeRoad'
    const config = {
      // Enable javascript in the webview
      enableScripts: true,
      // And restrict the webview to only loading content from our extension's `media` directory.
      localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'build'))],
      // prevents destroying the window when it is in the background
      retainContextWhenHidden: true,
      // allows scripts to load external resources (eg. markdown images, fonts)
      enableCommandUris: true,
    }
    state.loaded = true
    return vscode.window.createWebviewPanel(viewType, title, vscode.ViewColumn.Two, config)
  }

  let panel: vscode.WebviewPanel = createWebViewPanel()

  // Listen for when the panel is disposed
  // This happens when the user closes the panel or when the panel is closed programmatically
  panel.onDidDispose(
    () => {
      panel.dispose()
      state.loaded = false
    },
    null,
    disposables,
  )

  // Handle messages from the webview
  const receive = channel.receive
  const send = (action: T.Action) => panel.webview.postMessage(action)

  panel.webview.onDidReceiveMessage(receive, null, disposables)

  // panel.onDidDispose(() => {
  //   // Clean up our resources
  //   loaded = false
  //   panel.dispose()
  //   Promise.all(disposables.map((x) => x.dispose()))
  // })

  const rootPath = path.join(extensionPath, 'build')
  render(panel, rootPath)

  return {
    state,
    createOrShow() {
      vscode.commands.executeCommand('vscode.setEditorLayout', {
        orientation: 0,
        groups: [{ size: 0.6 }, { size: 0.4 }],
      })
      // If we already have a panel, show it.
      // Otherwise, create a new panel.

      if (panel && panel.webview) {
        vscode.window.showInformationMessage('CodeRoad already open')
        panel.reveal(vscode.ViewColumn.Two)
      } else {
        panel = createWebViewPanel()
      }
    },
    send,
    receive,
  }
}

export default createReactWebView
