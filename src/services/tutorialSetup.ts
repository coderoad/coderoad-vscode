import * as CR from 'typings'
import * as position from '../services/position'
import * as storage from '../editor/storage'
import { isEmptyWorkspace } from '../editor/workspace'
import { gitLoadCommits, gitInitIfNotExists, gitSetupRemote } from '../services/git'

const testRepo = 'https://github.com/ShMcK/coderoad-tutorial-basic.git'

async function initializeTutorial(tutorial: CR.Tutorial): Promise<void> {
  // TODO: refactor to allow client to call initialization
  const pos: CR.Position = await position.getInitial(tutorial)

  // eslint-disable-next-line
  const { steps } = tutorial.data
  const { setup } = steps[pos.stepId].actions
  await gitLoadCommits(setup)
}

export default async function tutorialSetup(tutorial: CR.Tutorial): Promise<void> {
  await isEmptyWorkspace()

  await gitInitIfNotExists()

  await Promise.all([gitSetupRemote(testRepo), storage.setTutorial(tutorial), storage.resetProgress()])

  await initializeTutorial(tutorial)
}
