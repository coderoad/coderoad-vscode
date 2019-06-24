import * as CR from 'typings'
import * as storage from '../../services/storage'
import { gitLoadCommits, gitClear } from '../../services/git'

export default async function loadSolution(dispatch: CR.EditorDispatch): Promise<void> {
  const [position, tutorial]: [CR.Position, CR.Tutorial | undefined] = await Promise.all([
    storage.getPosition(),
    storage.getTutorial(),
  ])
  if (!position) {
    throw new Error('No tutorial position state found')
  }
  if (!tutorial) {
    throw new Error('Local tutorial not found')
  }
  // eslint-disable-next-line
  const { solution } = tutorial.data.steps[position.stepId].actions

  await gitClear()
  await gitLoadCommits(solution, dispatch)
}
