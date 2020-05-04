import * as path from 'path'
import { Action } from 'typings'
import * as vscode from 'vscode'
import Channel from '../../channel'
import render from './render'

interface ReactWebViewProps {
  extensionPath: string
  workspaceState: vscode.Memento
}

const createReactWebView = ({ extensionPath, workspaceState }: ReactWebViewProps) => {
  let loaded = false
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
    loaded = true
    return vscode.window.createWebviewPanel(viewType, title, vscode.ViewColumn.Two, config)
  }

  let panel: vscode.WebviewPanel = createWebViewPanel()

  // Listen for when the panel is disposed
  // This happens when the user closes the panel or when the panel is closed programmatically
  panel.onDidDispose(panel.dispose, null, disposables)

  const channel = new Channel({
    workspaceState,
    postMessage: (action: Action): Thenable<boolean> => {
      return panel.webview.postMessage(action)
    },
  })
  // Handle messages from the webview
  const receive = channel.receive
  const send = channel.send

  panel.webview.onDidReceiveMessage(receive, null, disposables)

  const rootPath = path.join(extensionPath, 'build')
  render(panel, rootPath)

  return {
    dispose() {
      // Clean up our resources
      loaded = false
      panel.dispose()
      Promise.all(disposables.map((x) => x.dispose()))
    },
    createOrShow() {
      vscode.commands.executeCommand('vscode.setEditorLayout', {
        orientation: 0,
        groups: [{ size: 0.6 }, { size: 0.4 }],
      })
      // If we already have a panel, show it.
      // Otherwise, create a new panel.

      if (panel && panel.webview) {
        if (!loaded) {
          panel.reveal(vscode.ViewColumn.Two)
          loaded = true
        }
      } else {
        panel = createWebViewPanel()
      }
    },
    send,
    receive,
  }
}

export default createReactWebView
