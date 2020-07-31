import * as T from 'typings'
import * as TT from 'typings/tutorial'

const getNext = (position: T.Position, level: TT.Level, levels: TT.Level[]) => {
  const steps: TT.Step[] = level.steps

  if (steps.length && position.stepId) {
    const stepIndex = steps.findIndex((s: TT.Step) => s.id === position.stepId)
    const finalStep = stepIndex > -1 && stepIndex === steps.length - 1
    const hasNextStep = !finalStep

    // NEXT STEP
    if (hasNextStep) {
      const nextPosition = {
        levelId: position.levelId,
        stepId: steps[stepIndex + (position.complete ? 1 : 0)].id,
        complete: false,
      }
      return { type: 'NEXT_STEP', payload: nextPosition }
    }
  }

  const levelIndex = levels.findIndex((l: TT.Level) => l.id === position.levelId)
  const finalLevel = levelIndex > -1 && levelIndex === levels.length - 1
  const hasNextLevel = !finalLevel

  // NEXT LEVEL
  if (hasNextLevel) {
    const nextLevel = levels[levelIndex + 1]
    const nextPosition = {
      levelId: nextLevel.id,
      stepId: nextLevel.steps.length ? nextLevel.steps[0].id : null,
      complete: false,
    }
    return { type: 'NEXT_LEVEL', payload: nextPosition }
  }

  // COMPLETED
  return { type: 'COMPLETED' }
}

export default getNext
