import * as git from '../services/git'

async function saveCommit(): Promise<void> {
  git.saveCommit('Save progress')
}

export default saveCommit
