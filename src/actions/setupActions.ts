import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as git from '../services/git'
import loadWatchers from './utils/loadWatchers'
import openFiles from './utils/openFiles'
import runCommands from './utils/runCommands'
import onError from '../services/sentry/onError'

interface SetupActions {
  actions: TT.StepActions
  send: (action: T.Action) => void // send messages to client
  path?: string
}

export const setupActions = async ({ actions, send, path }: SetupActions): Promise<void> => {
  const { commands, commits, files, watchers } = actions

  // 1. run commits
  if (commits) {
    for (const commit of commits) {
      // TODO handle git errors
      await git.loadCommit(commit).catch(onError)
    }
  }

  // 2. open files
  openFiles(files || [])

  // 3. start file watchers
  loadWatchers(watchers || [])

  // 4. run command
  await runCommands({ commands: commands || [], send, path }).catch(onError)
}

export const solutionActions = async (params: SetupActions): Promise<void> => {
  await git.clear()
  return setupActions(params).catch(onError)
}
