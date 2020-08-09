import * as git from '../../git'

// avoid duplicate commits
const verifyCommitUnique = async (hash: string): Promise<boolean> => {
  const message: string | null = await git.getCommitMessage(hash)
  if (!message) {
    return false
  }
  const exists: boolean = await git.commitsExistsByMessage(message)
  return exists
}

export const loadCommits = async (commits: string[] = []): Promise<void> => {
  if (commits && commits.length) {
    // load the current list of commits for validation
    for (const commit of commits) {
      const commitExists = await verifyCommitUnique(commit)
      if (!commitExists) {
        await git.loadCommit(commit)
      }
    }
  }
}
