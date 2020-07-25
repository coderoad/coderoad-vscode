import * as CR from 'typings'
import * as TT from 'typings/tutorial'

const defaultValue: CR.Position = {
  levelId: '',
  stepId: null,
}

// position
class Position {
  private value: CR.Position
  constructor() {
    this.value = defaultValue
  }
  public get = () => {
    return this.value
  }
  public set = (value: CR.Position) => {
    this.value = value
  }
  public reset = () => {
    this.value = defaultValue
  }
  // calculate the current position based on the saved progress
  public setPositionFromProgress = (tutorial: TT.Tutorial, progress: CR.Progress): CR.Position => {
    // tutorial already completed
    // TODO handle start again?
    if (progress.complete) {
      return this.value
    }

    if (!tutorial || !tutorial.levels) {
      throw new Error('Error setting position from progress')
    }

    // get level
    const { levels } = tutorial
    const lastLevelIndex: number | undefined = levels.findIndex((l: TT.Level) => !progress.levels[l.id])
    if (lastLevelIndex >= levels.length) {
      throw new Error('Error setting progress level')
    }

    // get step
    const currentLevel: TT.Level = levels[lastLevelIndex]
    if (!currentLevel) {
      // tutorial complete but not reached completed view
      const finalLevel = levels[levels.length - 1]
      return {
        levelId: finalLevel.id,
        stepId: finalLevel.steps.length ? finalLevel.steps[finalLevel.steps.length - 1].id : null,
        complete: true,
      }
    }
    let currentStepId: string | null
    if (!currentLevel.steps.length) {
      // no steps available for level
      currentStepId = null
    } else {
      // find current step id
      const { steps } = currentLevel
      const lastStepIndex: number | undefined = steps.findIndex((s: TT.Step) => !progress.steps[s.id])
      if (lastStepIndex >= steps.length) {
        throw new Error('Error setting progress step')
      }
      // handle position when last step is complete but "continue" not yet selected
      const adjustedLastStepIndex = lastStepIndex === -1 ? steps.length - 1 : lastStepIndex
      currentStepId = steps[adjustedLastStepIndex].id
    }

    this.value = {
      levelId: currentLevel.id,
      stepId: currentStepId,
    }

    return this.value
  }
}

export default Position
