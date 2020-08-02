import { exec, removeFile } from '../node'

interface Input {
  hash: string
  branch: string
}

const ignoreError = () => {
  /* */
}

// note: attempted to do this as a bash script
// but requires the bash script has git permissions
const reset = async ({ branch, hash }: Input): Promise<void> => {
  const remote = 'coderoad'

  try {
    // if no git init, will initialize
    // otherwise re-initializes git
    await exec({ command: 'git init' }).catch(console.log)

    // capture current branch
    const hasBranch = await exec({ command: 'git branch --show-current' })
    const localBranch = hasBranch.stdout
    // check if coderoad remote exists
    const hasRemote = await exec({ command: 'git remote -v' }).catch(console.warn)
    if (!hasRemote || !hasRemote.stdout || !hasRemote.stdout.length) {
      throw new Error('No remote found')
    } else if (!hasRemote.stdout.match(new RegExp(remote))) {
      throw new Error(`No "${remote}" remote found`)
    }

    // switch to an empty branch
    await exec({
      command: 'git checkout --orphan reset-orphan-branch',
    })
    // stash any current work
    await exec({
      command: 'git stash',
    }).catch(ignoreError)

    // remove any other files
    await exec({
      command: 'git rm -rf .',
    }).catch(ignoreError)
    await removeFile('.gitignore').catch(ignoreError)

    await exec({
      command: `git branch -D ${localBranch}`,
    })
    await exec({
      command: `git checkout -b ${localBranch}`,
    })

    // load git timeline
    await exec({
      command: `git fetch coderoad ${branch}`,
    })
    await exec({
      command: `git merge coderoad/${branch}`,
    })
    // reset to target commit hash
    await exec({
      command: `git reset --hard ${hash}`,
    })
  } catch (error) {
    console.error('Error resetting')
    console.error(error.message)
  }
}

export default reset
