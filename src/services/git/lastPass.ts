import * as TT from '../../../typings/tutorial'
import * as T from '../../../typings'

const getLastPassCommitHash = (position: T.Position, levels: TT.Level[]) => {
  // get previous position
  const { levelId, stepId } = position

  // get solution hash if it exists
  // else get setup hash
}

export default getLastPassCommitHash
