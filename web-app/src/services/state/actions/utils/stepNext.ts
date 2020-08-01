import * as T from 'typings'
import * as TT from 'typings/tutorial'
import logger from '../../../../services/logger'

const getStepNext = (position: T.Position, level: TT.Level): T.Action => {
  logger('getStepNext position', position)
  const { steps } = level

  if (steps.length) {
    const stepIndex = steps.findIndex((s: TT.Step) => s.id === position.stepId)
    const finalStepIndex = steps.length - 1
    if (stepIndex < finalStepIndex) {
      const nextStep = steps[stepIndex + 1]
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
