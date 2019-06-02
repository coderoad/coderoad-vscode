import * as CR from 'typings'
import * as storage from '../editor/storage'

export async function getInitial(tutorial: CR.Tutorial): Promise<CR.Position> {
  const { data } = tutorial

  const levelId = data.summary.levelList[0]
  const stageId = data.levels[levelId].stageList[0]
  const stepId = data.stages[stageId].stepList[0]

  const position = {
    levelId,
    stageId,
    stepId,
  }

  storage.setPosition(position)

  return position
}

export async function loadProgressPosition() {
  const [tutorial, progress] = await Promise.all([storage.getTutorial(), storage.getProgress()])

  if (!tutorial) {
    throw new Error('No tutorial found')
  }

  // already complete
  if (progress.complete) {
    return
  }

  const {
    data: { summary, levels, stages },
  } = tutorial

  // loop over levels to find first incomplete
  const currentLevelId = summary.levelList.find((levelId: string) => !progress.levels[levelId])
  if (!currentLevelId) {
    throw new Error('Current level not found')
  }

  // loop over stages to find first incomplete
  const currentStageId = levels[currentLevelId].stageList.find((stageId: string) => !progress.stages[stageId])
  if (!currentStageId) {
    throw new Error('Current stage not found')
  }

  // loop over steps to find first incomplete
  const currentStepId = stages[currentStageId].stepList.find((stepId: string) => !progress.steps[stepId])
  if (!currentStepId) {
    throw new Error('Current step not found')
  }

  const position: CR.Position = {
    levelId: currentLevelId,
    stageId: currentStageId,
    stepId: currentStepId,
  }

  storage.setPosition(position)
}

export async function getPrev(): Promise<void> { }
