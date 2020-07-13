import * as fs from 'fs'
import { exec, exists } from '../node'

interface Input {
  hash: string
  branch: string
}

// note: attempted to do this as a bash script
// but requires the bash script has git permissions
const reset = async ({ branch, hash }: Input): Promise<void> => {
  // TODO: capture branch
  const localBranch = 'master'

  // switch to an empty branch
  await exec({
    command: 'git checkout --orphan reset-orphan-branch',
  })
  // stash any current work
  await exec({
    command: 'git stash',
  })
  // remove any other files
  await exec({
    command: 'git rm -rf .',
  })
  // TODO: delete .gitignore

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
    command: `git merge coderoad/${localBranch}`,
  })
  // reset to target commit hash
  await exec({
    command: `git reset --hard ${hash}`,
  })
}

export default reset
