import * as chokidar from 'chokidar'
import * as vscode from 'vscode'
import { COMMANDS } from '../../../commands'
import { WORKSPACE_ROOT } from '../../../environment'

// NOTE: vscode createFileWatcher doesn't seem to detect changes outside of vscode
// such as `npm install` of a package. Went with chokidar instead

// collect active file watchers as an object keyed on pattern
const watcherObject: { [key: string]: chokidar.FSWatcher } = {}

const disposeWatcher = (watcher: string) => {
  watcherObject[watcher].close()
  delete watcherObject[watcher]
}

export const loadWatchers = (watchers: string[] = []): void => {
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
      const fsWatcher: chokidar.FSWatcher = chokidar.watch(watcher, {
        cwd: WORKSPACE_ROOT,
        interval: 1000,
      })

      // prevent firing tests within 1 second of last test check
      const lastFire: Date | null = null

      // run tests on watcher change
      fsWatcher.on('change', (path, event) => {
        const now = +new Date()
        if (!lastFire || lastFire - now > 1000) {
          vscode.commands.executeCommand(COMMANDS.RUN_TEST, {
            callbacks: {
              onSuccess: () => {
                // cleanup watcher on success
                disposeWatcher(watcher)
              },
            },
          })
        }
      })

      // key fs watcher on name
      // to easily add/remove multiple watchers
      watcherObject[watcher] = fsWatcher
    }
  }
}

export const resetWatchers = (): void => {
  for (const watcher of Object.keys(watcherObject)) {
    disposeWatcher(watcher)
  }
}
