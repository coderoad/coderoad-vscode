import * as T from 'typings'
import * as TT from 'typings/tutorial'

export const defaultPosition = (): T.Position => ({
  levelId: '',
  stepId: null,
  complete: false,
})

export const initialPosition = (context: T.MachineContext) => {
  if (!context.tutorial) {
    throw new Error('Tutorial not found at initialPosition check')
  }
  const level: TT.Level = context.tutorial.levels[0]
  const position: T.Position = {
    levelId: level.id,
    stepId: level.steps.length ? level.steps[0].id : null,
    complete: false,
  }
  return position
}
