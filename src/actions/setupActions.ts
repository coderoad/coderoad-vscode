import * as G from 'typings/graphql'
import * as vscode from 'vscode'
import * as git from '../services/git'
import node from '../services/node'

import openFiles from './utils/openFiles'
import loadListeners from './utils/loadListeners'

const runCommands = async (commands: string[]) => {
  if (!commands.length) {
    return
  }
  for (const command of commands) {
    const { stdout, stderr } = await node.exec(command)
    if (stderr) {
      console.error(stderr)
    }
    console.log(`run command: ${command}`, stdout)
  }
}

const setupActions = async (workspaceRoot: vscode.WorkspaceFolder, actions: G.StepActions): Promise<void> => {
  const { commands, commits, files, listeners } = actions

  // 1. run commits
  if (commits) {
    for (const commit of commits) {
      await git.loadCommit(commit)
    }
  }

  // 2. open files
  openFiles(files || [])

  // 3. start file watchers (listeners)
  loadListeners(listeners || [], workspaceRoot.uri)

  // 4. run command
  await runCommands(commands || [])
}

export default setupActions
