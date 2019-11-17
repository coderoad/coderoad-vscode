import * as T from 'typings'
import * as G from 'typings/graphql'
import * as vscode from 'vscode'
import * as git from '../services/git'
import node from '../services/node'

import openFiles from './utils/openFiles'
import loadWatchers from './utils/loadWatchers'

const runCommands = async (commands: string[], send: (action: T.Action) => void) => {
  if (!commands.length) {
    return
  }
  for (const command of commands) {
    const process = {
      title: command,
      description: 'Running process',
    }
    send({ type: 'COMMAND_START', payload: { process: { ...process, status: 'RUNNING' } } })
    const { stdout, stderr } = await node.exec(command)
    if (stderr) {
      // TODO: distinguish fail & error
      console.error(stderr)
      send({ type: 'COMMAND_FAIL', payload: { process: { ...process, status: 'FAIL' } } })
    } else {
      send({ type: 'COMMAND_SUCCESS', payload: { process: { ...process, status: 'SUCCESS' } } })
    }
  }
}

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
