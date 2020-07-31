import * as T from 'typings'
import * as TT from 'typings/tutorial'

const getProgress = (levels: TT.Level[] = [], position: T.Position): number => {
  let progress = 0
  let isLevelComplete = false
  if (levels && levels.length) {
    const totalLevels = levels.length
    const findLevel = (level: TT.Level) => level.id === position.levelId
    const currentLevel: TT.Level | undefined = levels.find(findLevel)
    let currentLevelIndex: number = levels.findIndex(findLevel)
    if (!currentLevel) {
      throw new Error('Invalid level')
    }
    // check if the level is complete
    if (position.stepId && currentLevel.steps && currentLevel.steps.length) {
      const lastStepInLevel: TT.Step | null = currentLevel.steps[currentLevel.steps.length]
      isLevelComplete = position.complete && lastStepInLevel.id === position.stepId
    } else {
      isLevelComplete = position.complete
    }
    progress = Math.round(((currentLevelIndex + (isLevelComplete ? 1 : 0)) / totalLevels) * 100)
  }
  return progress
}

export default getProgress
