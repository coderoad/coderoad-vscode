import * as TT from 'typings/tutorial'
import * as git from '../git'
import { loadCommits } from './utils/commits'
import { loadWatchers, resetWatchers } from './utils/watchers'
import openFiles from './utils/openFiles'
import runCommands from './utils/runCommands'
import runVSCodeCommands from './utils/runVSCodeCommands'
import * as telemetry from '../telemetry'
import { runTest } from '../../actions/onTest'
import { VERSION } from '../../environment'
import * as webhooks from './webhooks'

// run at the end of when a tutorial is configured
export const onInit = async (actions: TT.StepActions): Promise<void> => {
  await loadCommits(actions?.commits)
  await runCommands(actions?.commands)
  await runVSCodeCommands(actions?.vscodeCommands)
  webhooks.onInit({
    // tutorialId,
    coderoadVersion: VERSION,
  })
}

// run when a level starts
export const onLevelEnter = async (actions: TT.StepActions): Promise<void> => {
  await loadCommits(actions?.commits)
  await runCommands(actions?.commands)
}

// run when a step starts
export const onSetupEnter = async (actions: TT.StepActions): Promise<void> => {
  await loadCommits(actions?.commits)
  await openFiles(actions?.files)
  await loadWatchers(actions?.watchers)
  await runCommands(actions?.commands)
  await runVSCodeCommands(actions?.vscodeCommands)
}

// run when a step solution starts
export const onSolutionEnter = async (actions: TT.StepActions): Promise<void> => {
  await git.clear()
  await loadCommits(actions?.commits)
  await openFiles(actions?.files)
  await runCommands(actions?.commands)
  await runVSCodeCommands(actions?.vscodeCommands)
  await runTest()
}

// run when "reset" is triggered
export const onReset = async (actions: TT.StepActions): Promise<void> => {
  await resetWatchers()
  await runCommands(actions?.commands)
  await runVSCodeCommands(actions?.vscodeCommands)
  webhooks.onReset({
    // tutorialId,
  })
}

// run when an uncaught exception is thrown
export const onError = async (error: Error): Promise<void> => {
  telemetry.onError(error)
}

// run when a step task passes
export const onStepComplete = async ({
  tutorialId,
  levelId,
  stepId,
}: {
  tutorialId: string
  levelId: string
  stepId: string
}): Promise<void> => {
  git.saveCommit(`Save progress: ${stepId}`)
  telemetry.onEvent('step_complete', { tutorialId, stepId, levelId, version: VERSION })
  webhooks.onStepComplete({
    tutorialId,
    levelId,
    stepId,
  })
}

// run when a level is complete (all tasks pass or no tasks)
export const onLevelComplete = async ({
  tutorialId,
  levelId,
}: {
  tutorialId: string
  levelId: string
}): Promise<void> => {
  telemetry.onEvent('level_complete', { tutorialId, levelId, version: VERSION })
  webhooks.onLevelComplete({
    tutorialId,
    levelId,
  })
}

// run when all levels are complete
export const onTutorialComplete = async ({ tutorialId }: { tutorialId: string }): Promise<void> => {
  telemetry.onEvent('tutorial_complete', { tutorialId, version: VERSION })
  webhooks.onTutorialComplete({
    tutorialId,
  })
}
