import * as T from 'typings'
import * as TT from 'typings/tutorial'

const getStepNext = (position: T.Position, level: TT.Level): T.Action => {
  const { steps } = level

  if (steps.length) {
    const stepIndex = steps.findIndex((s: TT.Step) => s.id === position.stepId)
    const nextStep = steps[stepIndex]
    return {
      type: 'LOAD_NEXT_STEP',
      payload: {
        step: nextStep,
      },
    }
  }
  return {
    type: 'LEVEL_COMPLETE',
  }
}

export default getStepNext
