import * as git from '../../git'

const loadCommits = async (commits: string[]): Promise<void> => {
  if (commits) {
    // load the current list of commits for validation
    for (const commit of commits) {
      await git.loadCommit(commit)
    }
  }
}

export default loadCommits
