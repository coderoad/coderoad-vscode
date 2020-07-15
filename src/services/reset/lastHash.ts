import * as TT from '../../../typings/tutorial'
import * as T from '../../../typings'

const getLastCommitHash = (position: T.Position, levels: TT.Level[]) => {
  // get previous position
  const { levelId, stepId } = position

  const level: TT.Level | undefined = levels.find((l) => levelId === l.id)
  if (!level) {
    throw new Error(`No level found matching ${levelId}`)
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
