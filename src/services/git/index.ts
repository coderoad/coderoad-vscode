import * as TT from 'typings/tutorial'
import { exec, exists } from '../node'
import { getVersion, compareVersions } from '../dependencies'
import logger from '../logger'

export const gitOrigin = 'coderoad'

const stashAllFiles = async (): Promise<never | void> => {
  // stash files including untracked (eg. newly created file)
  const { stderr } = await exec({ command: `git stash --include-untracked` })
  if (stderr) {
    logger(`Error: ${stderr}`)
    throw new Error('Error stashing files')
  }
}

const cherryPickCommit = async (commit: string, count = 0): Promise<never | void> => {
  if (count > 1) {
    logger('cherry-pick failed')
    return
  }
  try {
    // cherry-pick pulls commits from another branch
    // -X theirs merges and accepts incoming changes over existing changes
    const { stdout } = await exec({ command: `git cherry-pick -X theirs ${commit}` })
    if (!stdout) {
      throw new Error('No cherry-pick output')
    }
  } catch (error: any) {
    logger(`cherry-pick-commit failed: ${error.message}`)
    // stash all files if cherry-pick fails
    await stashAllFiles()
    return cherryPickCommit(commit, ++count)
  }
}

/*
    SINGLE git cherry-pick %COMMIT%
    if fails, will stash all and retry
*/
export function loadCommit(commit: string): Promise<never | void> {
  return cherryPickCommit(commit)
}

/* 
    save commit
    git commit -am '${level}/${step} complete'
*/

export async function saveCommit(message: string): Promise<never | void> {
  const { stdout, stderr } = await exec({ command: `git commit -am '${message}'` })
  if (stderr) {
    logger(`Error: ${stderr}`)
    throw new Error('Error saving progress to Git')
  }
  logger(`Commit saved: ${stdout}`)
}

export async function clear(): Promise<Error | void> {
  try {
    // commit progress to git
    const { stderr } = await exec({ command: 'git reset HEAD --hard && git clean -fd' })
    if (!stderr) {
      return
    }
    logger(`Error: ${stderr}`)
  } catch (error: any) {
    logger(`Error: ${error.message}`)
  }
  throw new Error('Error cleaning up current unsaved work')
}

async function init(): Promise<Error | void> {
  const { version: gitVersion, error: gitError } = await getVersion('git')
  if (gitError) {
    throw new Error(`Error: Git config error: ${gitError.message}`)
  }
  if (!gitVersion) {
    throw new Error('Error: No git version found')
  }
  const hasInitialBranch = await compareVersions(gitVersion, '>=2.28.0')
  let stderr
  if (hasInitialBranch) {
    // --initial-branch is introduced in git v2.28 when git changed the default master -> main
    const initResult = await exec({ command: 'git init --initial-branch=master' })
    stderr = initResult.stderr
  } else {
    // pre git v2.28, master is default branch
    const initResult = await exec({ command: 'git init' })
    stderr = initResult.stderr
  }
  // note: prevents stderr warning concerning default init branch
  if (stderr) {
    throw new Error(`Error initializing Git: ${stderr}`)
  }
}

export async function initIfNotExists(): Promise<never | void> {
  const hasGitInit = exists('.git')
  if (!hasGitInit) {
    await init()
  }
}

export async function checkRemoteConnects(repo: TT.TutorialRepo): Promise<never | void> {
  // check for git repo
  const externalRepoExists = await exec({ command: `git ls-remote --exit-code --heads ${repo.uri}` })
  if (externalRepoExists.stderr) {
    // no repo found or no internet connection
    throw new Error(externalRepoExists.stderr)
  }
  // check for git repo branch
  const { stderr, stdout } = await exec({ command: `git ls-remote --exit-code --heads ${repo.uri} ${repo.branch}` })
  if (stderr) {
    throw new Error(stderr)
  }
  if (!stdout || !stdout.length) {
    throw new Error('Tutorial branch does not exist')
  }
}

export async function addRemote(repo: string): Promise<never | void> {
  const { stderr } = await exec({ command: `git remote add ${gitOrigin} ${repo} && git fetch ${gitOrigin}` })
  if (stderr) {
    const alreadyExists = stderr.match(`${gitOrigin} already exists.`)
    const successfulNewBranch = stderr.match('new branch')

    // validate the response is acceptable
    if (!alreadyExists && !successfulNewBranch) {
      logger(`Error: ${stderr}`)
      throw new Error('Error adding git remote')
    }
  }
}

export async function checkRemoteExists(): Promise<boolean> {
  try {
    const { stdout, stderr } = await exec({ command: 'git remote -v' })
    if (stderr) {
      return false
    }
    // string match on remote output
    // TODO improve the specificity of this regex
    return !!stdout.match(gitOrigin)
  } catch (error: any) {
    logger(`Warn: ${error.message}`)
    return false
  }
}

export async function setupCodeRoadRemote(repo: string): Promise<never | void> {
  // check coderoad remote not taken
  const hasRemote = await checkRemoteExists()
  // git remote add coderoad tutorial
  // git fetch coderoad
  if (hasRemote) {
    // TODO: verify the remote is the same
    return
  }
  await addRemote(repo)
}

export async function loadCommitHistory(): Promise<string[]> {
  try {
    // returns an list of commit hashes
    const { stdout, stderr } = await exec({ command: 'git log --pretty=format:"%h"' })
    if (stderr) {
      return []
    }
    // string match on remote output
    return stdout.split('\n')
  } catch (error: any) {
    // likely no git setup or no commits
    logger(`Warn: ${error.message}`)
    return []
  }
}

// return the short form of a hash (first 7 characters)
// using `git rev-parse` seems unnecessarily slower
export function getShortHash(hash: string): string {
  return hash.slice(0, 7)
}

export async function getCommitMessage(hash: string): Promise<string | null> {
  try {
    // returns an list of commit hashes
    const { stdout, stderr } = await exec({ command: `git log -n 1 --pretty=format:%s ${hash}` })
    if (stderr) {
      return null
    }
    // string match on remote output
    return stdout
  } catch (error: any) {
    logger(`Error: ${error.message}`)
    // likely no git commit message found
    return null
  }
}

export async function commitsExistsByMessage(message: string): Promise<boolean> {
  try {
    // returns a list of commit hashes
    const { stdout, stderr } = await exec({ command: `git log -g --grep='${message}'` })
    if (stderr) {
      return false
    }
    return !!stdout.length
  } catch (error: any) {
    logger(`Error: ${error.message}`)
    // likely no commit found
    return false
  }
}

export async function validateGitConfig(target: string): Promise<boolean> {
  try {
    // returns a list of commit hashes
    const { stdout, stderr } = await exec({ command: `git config ${target}` })
    if (stderr) {
      return false
    }
    return !!stdout.length
  } catch (error) {
    return false
  }
}
