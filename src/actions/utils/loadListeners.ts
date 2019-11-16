import * as vscode from 'vscode'
import { COMMANDS } from '../../editor/commands'

// collect active file watchers (listeners)
const watchers: { [key: string]: vscode.FileSystemWatcher } = {}

const disposeWatcher = (listener: string) => {
  watchers[listener].dispose()
  delete watchers[listener]
}

const loadListeners = (listeners: string[], workspaceUri: vscode.Uri) => {
  if (!listeners.length) {
    // remove all watchers
    for (const listener of Object.keys(watchers)) {
      disposeWatcher(listener)
    }
  }
  for (const listener of listeners) {
    if (!watchers[listener]) {
      // const rootUri = vscode.workspace.getWorkspaceFolder(workspaceUri)
      // const pattern = listener // eslin
      // console.log(pattern)
      const listen = vscode.workspace.createFileSystemWatcher('**/*.js')
      listen.onDidChange(() => {
        console.log('onDidChange')
        // trigger save
        vscode.commands.executeCommand(COMMANDS.RUN_TEST, null, () => {
          // cleanup watcher on success
          disposeWatcher(listener)
        })
      })
      listen.onDidCreate(() => {
        console.log('onDidCreate')
        // trigger save
        vscode.commands.executeCommand(COMMANDS.RUN_TEST, null, () => {
          // cleanup watcher on success
          disposeWatcher(listener)
        })
      })
      listen.onDidDelete(() => {
        console.log('onDidDelete')
        // trigger save
        vscode.commands.executeCommand(COMMANDS.RUN_TEST, null, () => {
          // cleanup watcher on success
          disposeWatcher(listener)
        })
      })
      watchers[listener] = listen
    }
  }
}

export default loadListeners
