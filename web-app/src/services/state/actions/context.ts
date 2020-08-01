import * as T from 'typings'
import * as TT from 'typings/tutorial'
import { assign, send } from 'xstate'
import * as selectors from '../../selectors'
import getStepNext from './utils/stepNext'
import getNext from './utils/getNext'

export const setStart = assign({
  env: (context: T.MachineContext, event: T.MachineEvent) => {
    return {
      ...context.env,
      ...event.payload.env,
    }
  },
})

export const loadContinuedTutorial = assign((context: T.MachineContext, event: T.MachineEvent): any => {
  return {
    env: {
      ...context.env,
      ...event.payload.env,
    },
    tutorial: event.payload.tutorial,
    position: event.payload.position,
  }
})

export const initPosition = assign({
  position: (context: T.MachineContext, event: T.MachineEvent): any => {
    const position: T.Position = selectors.initialPosition(context)
    return position
  },
})

export const updateStepPosition = assign({
  position: (context: T.MachineContext, event: T.MachineEvent): any => {
    const { position } = context
    // merge in the updated position
    // sent with the test to ensure consistency
    const level: TT.Level = selectors.currentLevel(context)
    const steps: TT.Step[] = level.steps

    // final step now completed
    if (steps[steps.length - 1].id === position.stepId) {
      return { ...position, complete: true }
    }

    const stepIndex = steps.findIndex((s: TT.Step) => s.id === position.stepId)

    const step: TT.Step = steps[stepIndex + 1]

    const nextPosition: T.Position = {
      ...position,
      stepId: step.id,
      complete: false,
    }

    return nextPosition
  },
})

export const updatePosition = assign({
  position: (context: T.MachineContext, event: T.MachineEvent): any => {
    return event.payload
  },
})

export const loadNext = send(
  (context: T.MachineContext): T.Action => {
    const level = selectors.currentLevel(context)
    return getNext(context.position, level, context.tutorial?.levels || [])
  },
)

export const stepNext = send(
  (context: T.MachineContext): T.Action => {
    const level: TT.Level = selectors.currentLevel(context)
    console.log(`STEP_NEXT: ${JSON.stringify(context.position)}`)
    console.log(`STEP NEXT LEVEL ${JSON.stringify(level)}`)
    return getStepNext(context.position, level)
  },
)

export const reset = assign({
  tutorial() {
    return null
  },
  position(): T.Position {
    const position: T.Position = selectors.defaultPosition()
    return position
  },
  processes() {
    return []
  },
})

export const setError = assign({
  error: (context: T.MachineContext, event: T.MachineEvent): any => {
    const message: string | null = event.payload.error
    return message
  },
})

export const clearError = assign({
  error: (): any => null,
})

export const checkLevelCompleted = send((context: T.MachineContext) => {
  const currentLevel = selectors.currentLevel(context)
  let hasNoSteps = false
  let finalStepComplete = false
  if (!currentLevel.steps.length) {
    hasNoSteps = true
  } else {
    const finalStep = currentLevel.steps[currentLevel.steps.length - 1]
    finalStepComplete = finalStep.id === context.position.stepId && context.position.complete
  }

  return {
    type: hasNoSteps || finalStepComplete ? 'START_COMPLETED_LEVEL' : 'START_LEVEL',
  }
})

export const setTutorialContext = assign({
  tutorial: (context: T.MachineContext, event: T.MachineEvent): any => {
    return event.payload.tutorial
  },
})
