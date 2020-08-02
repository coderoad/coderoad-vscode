import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as git from '../git'
import loadCommits from './utils/loadCommits'
import loadWatchers from './utils/loadWatchers'
import openFiles from './utils/openFiles'
import runCommands from './utils/runCommands'
import runVSCodeCommands from './utils/runVSCodeCommands'
import { onError as telemetryOnError } from '../telemetry'
import { onRunTest } from '../../actions/onTest'
import logger from '../logger'

export const onInit = async (actions: TT.StepActions): Promise<void> => {
  await loadCommits(actions?.commits)
  await runCommands(actions?.commands)
  await runVSCodeCommands(actions?.vscodeCommands)
}

export const onLevelEnter = async (actions: TT.StepActions): Promise<void> => {
  await loadCommits(actions?.commits)
  await runCommands(actions?.commands)
}

export const onSetupEnter = async (actions: TT.StepActions): Promise<void> => {
  await loadCommits(actions?.commits)
  await openFiles(actions?.files)
  await loadWatchers(actions?.watchers)
  await runCommands(actions?.commands)
  await runVSCodeCommands(actions?.vscodeCommands)
}

export const onSolutionEnter = async (actions: TT.StepActions): Promise<void> => {
  await git.clear()
  await loadCommits(actions?.commits)
  await openFiles(actions?.files)
  await runCommands(actions?.commands)
  await runVSCodeCommands(actions?.vscodeCommands)
  await onRunTest()
}

export const onError = async (error: Error): Promise<void> => {
  telemetryOnError(error)
}

export const onStepComplete = async ({ levelId, stepId }: { levelId: string; stepId: string }): Promise<void> => {
  logger(`ON STEP COMPLETE: ${JSON.stringify({ levelId, stepId })}`)
}

export const onLevelComplete = async ({ levelId }: { levelId: string }): Promise<void> => {
  logger(`ON LEVEL COMPLETE: ${JSON.stringify(levelId)}`)
}

export const onTutorialComplete = async ({ tutorialId }: { tutorialId: string }): Promise<void> => {
  logger(`ON TUTORIAL COMPLETE: ${JSON.stringify(tutorialId)}`)
}
