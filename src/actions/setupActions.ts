import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as git from '../services/git'
import loadWatchers from './utils/loadWatchers'
import openFiles from './utils/openFiles'
import runCommands from './utils/runCommands'
import onError from '../services/sentry/onError'
import logger from '../services/logger'

interface SetupActions {
  actions: TT.StepActions
  send: (action: T.Action) => void // send messages to client
  path?: string
}

export const setupActions = async ({ actions, send, path }: SetupActions): Promise<void> => {
  const { commands, commits, files, watchers } = actions

  // validate commit is new
  let alreadyLoaded = false

  // 1. run commits
  if (commits) {
    // load the current list of commits for validation
    const currentCommits: string[] = await git.loadCommitHistory()
    for (const commit of commits) {
      // validate that commit has not already been created as a safety net
      if (currentCommits.includes(git.getShortHash(commit))) {
        logger(`Commit ${commit} already loaded`)
        alreadyLoaded = true
        continue
      }
      await git.loadCommit(commit).catch(onError)
    }
  }

  // 2. open files
  openFiles(files || [])

  // 3. start file watchers
  loadWatchers(watchers || [])

  // 4. run command
  if (!alreadyLoaded) {
    await runCommands({ commands: commands || [], send, path }).catch(onError)
  }
}

export const solutionActions = async (params: SetupActions): Promise<void> => {
  await git.clear()
  return setupActions(params).catch(onError)
}
