import * as CR from 'typings'
import * as vscode from 'vscode'
import * as storage from './storage'


export async function onSuccess(position: CR.Position) {
  console.log('onSuccess', position)
  vscode.window.showInformationMessage('SUCCESS')

  // calculate progress changes
  const [progress, tutorial] = await Promise.all([storage.getProgress(), storage.getTutorial()])

  if (!tutorial) {
    throw new Error('No tutorial found')
  }

  if (!position.stepId) {
    throw new Error('No step position found')
  }

  const { data } = tutorial

  // step complete
  const nextProgress = progress
  nextProgress.steps[position.stepId] = true

  // is stage complete
  const steps = data.stages[position.stageId].stepList
  const isStageComplete = progress.stages[position.stageId] || steps[steps.length - 1] === position.stepId
  nextProgress.stages[position.stageId] = isStageComplete

  // is level complete
  if (isStageComplete) {
    const stages = data.levels[position.levelId].stageList
    const isLevelComplete = progress.levels[position.levelId] || stages[stages.length - 1] === position.stageId
    nextProgress.levels[position.levelId] = isLevelComplete

    if (isLevelComplete) {
      const levels = data.summary.levelList
      const isTutorialComplete = progress.complete || levels[levels.length - 1] === position.levelId
      nextProgress.complete = isTutorialComplete
    }
  }
  console.log('nextProgress', nextProgress)

  // update ls progress
  storage.updateProgress(nextProgress)
  // send({ type: 'STEP_COMPLETE', payload: { progress: nextProgress } })
}

export async function onFailure() {
  // TODO: capture analytics on stepId
  vscode.window.showWarningMessage('FAIL')
}
