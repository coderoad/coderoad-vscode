import * as T from 'typings'
import * as G from 'typings/graphql'
import * as vscode from 'vscode'
import * as git from '../services/git'

import openFiles from './utils/openFiles'
import loadWatchers from './utils/loadWatchers'
import runCommands from './utils/runCommands'

const setupActions = async (
  workspaceRoot: vscode.WorkspaceFolder,
  actions: G.StepActions,
  send: (action: T.Action) => void, // send messages to client
): Promise<void> => {
  const { commands, commits, files, watchers } = actions

  // 1. run commits
  if (commits) {
    for (const commit of commits) {
      // TODO handle git errors
      await git.loadCommit(commit)
    }
  }

  // 2. open files
  openFiles(files || [])

  // 3. start file watchers
  loadWatchers(watchers || [], workspaceRoot.uri)

  // 4. run command
  await runCommands(commands || [], send)
}

export default setupActions
