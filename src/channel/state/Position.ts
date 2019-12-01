import * as CR from 'typings'
import * as G from 'typings/graphql'

const defaultValue: CR.Position = {
  levelId: '',
  stepId: '',
}

// position
class Position {
  private value: CR.Position
  constructor() {
    this.value = defaultValue
  }
  public get = () => {
    if (!this.value.levelId || !this.value.stepId) {
      console.log('NO POSITION RETURNED')
    }
    console.log(this.value)
    return this.value
  }
  public set = (value: CR.Position) => {
    console.log('--- position set')
    console.log(value)
    this.value = value
  }
  public reset = () => {
    this.value = defaultValue
  }
  // calculate the current position based on the saved progress
  public setPositionFromProgress = (tutorial: G.Tutorial, progress: CR.Progress): CR.Position => {
    console.log('--- set position from progress')
    // tutorial already completed
    // TODO handle start again?
    if (progress.complete) {
      return this.value
    }

    if (!tutorial || !tutorial.version || !tutorial.version.data || !tutorial.version.data.levels) {
      throw new Error('Error setting position from progress')
    }

    const { levels } = tutorial.version.data

    const lastLevelIndex: number | undefined = levels.findIndex((l: G.Level) => !progress.levels[l.id])
    // TODO consider all levels complete as progress.complete
    if (lastLevelIndex >= levels.length) {
      throw new Error('Error setting progress level')
    }
    const currentLevel: G.Level = levels[lastLevelIndex]

    const { steps } = currentLevel

    const lastStepIndex: number | undefined = steps.findIndex((s: G.Step) => !progress.steps[s.id])
    if (lastStepIndex >= steps.length) {
      throw new Error('Error setting progress step')
    }
    // handle position when last step is complete but "continue" not yet selected
    const adjustedLastStepIndex = lastStepIndex === -1 ? steps.length - 1 : lastStepIndex
    const currentStep: G.Step = steps[adjustedLastStepIndex]

    this.value = {
      levelId: currentLevel.id,
      stepId: currentStep.id,
    }

    console.log('--- calculated set position from progress')
    console.log(this.value)
    return this.value
  }
}

export default Position
