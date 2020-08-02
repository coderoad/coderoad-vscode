import * as TT from '../../../typings/tutorial'
import * as T from '../../../typings'

const getLastCommitHash = (position: T.Position, tutorial: TT.Tutorial | null): string => {
  if (!tutorial) {
    throw new Error('No tutorial found')
  }
  const { levels } = tutorial
  // get previous position
  const { levelId, stepId } = position

  let level: TT.Level | undefined = levels.find((l) => levelId === l.id)
  if (!level) {
    throw new Error(`No level found matching ${levelId}`)
  }

  // handle a level with no steps
  if (!level.steps || !level.steps.length) {
    if (level.setup && level.setup.commits) {
      // return level commit
      const levelCommits = level.setup.commits
      return levelCommits[levelCommits.length - 1]
    } else {
      // is there a previous level?
      // @ts-ignore
      const levelIndex = levels.findIndex((l: TT.Level) => level.id === l.id)
      if (levelIndex > 0) {
        level = levels[levelIndex - 1]
      } else {
        // use init commit
        const configCommits = tutorial.config.setup?.commits
        if (!configCommits) {
          throw new Error('No commits found to reset back to')
        }
        return configCommits[configCommits.length - 1]
      }
    }
  }

  const step = level.steps.find((s) => stepId === s.id)
  if (!step) {
    throw new Error(`No step found matching ${stepId}`)
  }
  const commits = step.setup.commits
  if (!commits.length) {
    throw new Error(`No commits found on step ${stepId}`)
  }
  return commits[commits.length - 1]
}

export default getLastCommitHash
