import { createSelector } from 'reselect'
import { MachineContext } from 'typings'
import * as G from 'typings/graphql'
import onError from '../../services/sentry/onError'

export const currentTutorial = ({ tutorial }: MachineContext): G.Tutorial => {
  if (!tutorial) {
    const error = new Error('Tutorial not found')
    onError(error)
    throw error
  }
  return tutorial
}

export const currentVersion = createSelector(currentTutorial, (tutorial: G.Tutorial) => {
  if (!tutorial.version) {
    const error = new Error('Tutorial version not found')
    onError(error)
    throw error
  }
  return tutorial.version
})

export const currentLevel = (context: MachineContext): G.Level =>
  createSelector(
    currentVersion,
    (version: G.TutorialVersion): G.Level => {
      // merge in the updated position
      // sent with the test to ensure consistency
      const levels: G.Level[] = version.data.levels

      const levelIndex = levels.findIndex((l: G.Level) => l.id === context.position.levelId)
      if (levelIndex < 0) {
        const error = new Error(`Level not found when selecting level for ${version}`)
        onError(error)
        throw error
      }
      const level: G.Level = levels[levelIndex]

      return level
    },
  )(context)

export const currentStep = (context: MachineContext): G.Step =>
  createSelector(
    currentLevel,
    (level: G.Level): G.Step => {
      const steps: G.Step[] = level.steps
      const step: G.Step | undefined = steps.find((s: G.Step) => s.id === context.position.stepId)
      if (!step) {
        const error = new Error(`No Step found for Level ${level.id}. Expected step ${context.position.stepId}`)
        onError(error)
        throw error
      }
      return step
    },
  )(context)
