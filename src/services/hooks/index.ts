import * as TT from 'typings/tutorial'
import * as git from '../git'
import loadCommits from './utils/loadCommits'
import loadWatchers from './utils/loadWatchers'
import openFiles from './utils/openFiles'
import runCommands from './utils/runCommands'
import runVSCodeCommands from './utils/runVSCodeCommands'
import { onError as telemetryOnError } from '../telemetry'
import { onRunTest } from '../../actions/onTest'

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
