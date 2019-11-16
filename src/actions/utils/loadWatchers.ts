import * as vscode from 'vscode'
import * as chokidar from 'chokidar'
import { COMMANDS } from '../../editor/commands'

// NOTE: vscode createFileWatcher doesn't seem to detect changes outside of vscode
// such as `npm install` of a package. Went with chokidar instead

// collect active file watchers as an object keyed on pattern
const watcherObject: { [key: string]: chokidar.FSWatcher } = {}

const disposeWatcher = (watcher: string) => {
  watcherObject[watcher].close()
  delete watcherObject[watcher]
}

const loadWatchers = (watchers: string[], workspaceUri: vscode.Uri) => {
  if (!watchers.length) {
    // remove all watchers
    for (const watcher of Object.keys(watcherObject)) {
      disposeWatcher(watcher)
    }
  }
  for (const watcher of watchers) {
    if (!watcherObject[watcher]) {
      // see how glob patterns are used in VSCode (not like a regex)
      // https://code.visualstudio.com/api/references/vscode-api#GlobPattern
      const rootUri = vscode.workspace.getWorkspaceFolder(workspaceUri)
      if (!rootUri) {
        return
      }

      const listener: chokidar.FSWatcher = chokidar.watch(watcher, {
        cwd: rootUri.uri.path,
        interval: 1000,
      })

      listener.on('change', (path, event) => {
        vscode.commands.executeCommand(COMMANDS.RUN_TEST, null, () => {
          // cleanup watcher on success
          disposeWatcher(watcher)
        })
      })

      watcherObject[watcher] = listener
    }
  }
}

export default loadWatchers
