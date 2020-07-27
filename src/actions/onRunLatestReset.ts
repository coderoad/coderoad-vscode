import * as T from 'typings'
import * as TT from 'typings/tutorial'
import Context from '../services/context/context'
import { exec } from '../services/node'
import reset from '../services/reset'
import getLastCommitHash from '../services/reset/lastHash'

// reset to the start of the last test
const onRunLatestReset = async (context: Context) => {
  // reset to timeline
  const tutorial: TT.Tutorial | null = context.tutorial.get()
  const position: T.Position = context.position.get()

  // get last pass commit
  const hash = getLastCommitHash(position, tutorial?.levels || [])

  const branch = tutorial?.config.repo.branch

  if (!branch) {
    console.error('No repo branch found for tutorial')
    return
  }

  // load timeline until last pass commit
  reset({ branch, hash })

  // if tutorial.config.reset.command, run it
  if (tutorial?.config?.reset?.command) {
    await exec({ command: tutorial.config.reset.command })
  }
}

export default onRunLatestReset
