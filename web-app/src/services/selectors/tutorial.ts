import { createSelector } from 'reselect'
import { MachineContext } from 'typings'
import * as TT from 'typings/tutorial'

export const currentTutorial = ({ tutorial }: MachineContext): TT.Tutorial => {
  if (!tutorial) {
    const error = new Error('Tutorial not found')
    // TODO: onError(error)
    throw error
  }
  return tutorial
}

export const currentLevel = (context: MachineContext): TT.Level =>
  createSelector(
    currentTutorial,
    (tutorial: TT.Tutorial): TT.Level => {
      // merge in the updated position
      // sent with the test to ensure consistency
      const levels: TT.Level[] = tutorial.levels

      const levelIndex = levels.findIndex((l: TT.Level) => l.id === context.position.levelId)
      if (levelIndex < 0) {
        const error = new Error(`Level not found when selecting level for ${tutorial.id}`)
        // TODO: onError(error)
        throw error
      }
      const level: TT.Level = levels[levelIndex]

      return level
    },
  )(context)

export const currentStep = (context: MachineContext): TT.Step | null =>
  createSelector(currentLevel, (level: TT.Level): TT.Step | null => {
    const steps: TT.Step[] = level.steps
    const step: TT.Step | null = steps.find((s: TT.Step) => s.id === context.position.stepId) || null
    return step
  })(context)
