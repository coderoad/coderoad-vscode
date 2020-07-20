import * as git from '../services/git'
import * as T from 'typings'
import * as vscode from 'vscode'
import { COMMANDS } from '../commands'
import Context from '../services/context/context'

export const onTestPass = (action: T.Action, context: Context) => {
  const tutorial = context.tutorial.get()
  if (!tutorial) {
    throw new Error('Error with current tutorial. Tutorial may be missing an id.')
  }
  // update local storage stepProgress
  const progress = context.progress.setStepComplete(tutorial, action.payload.position.stepId)
  context.position.setPositionFromProgress(tutorial, progress)
  git.saveCommit('Save progress')
}

export const onRunTest = (action?: T.Action) => {
  vscode.commands.executeCommand(COMMANDS.RUN_TEST, action?.payload)
}
