import * as T from 'typings'
import * as TT from 'typings/tutorial'

const getStepNext = (position: T.Position, level: TT.Level): T.Action => {
  const { steps } = level

  if (steps.length && position.stepId) {
    const stepIndex = steps.findIndex((s: TT.Step) => s.id === position.stepId)
    const finalStep = stepIndex === steps.length - 1
    // not final step, or final step but not complete
    const hasNextStep = !finalStep

    if (hasNextStep) {
      const nextStep = steps[stepIndex + (position.complete ? 1 : 0)]
      return {
        type: 'LOAD_NEXT_STEP',
        payload: {
          step: nextStep,
        },
      }
    }
  }
  return {
    type: 'LEVEL_COMPLETE',
  }
}

export default getStepNext
