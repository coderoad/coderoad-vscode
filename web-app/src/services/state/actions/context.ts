import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as E from 'typings/error'
import { assign, send } from 'xstate'
import * as selectors from '../../selectors'
import getStepNext from './utils/stepNext'
import getNext from './utils/getNext'
import logger from 'services/logger'
import errors from '../../errors/en.json'

export const setStart = assign({
  env: (context: T.MachineContext, event: T.MachineEvent) => {
    return {
      ...context.env,
      ...event.payload.env,
    }
  },
})

export const loadContinuedTutorial = assign((context: T.MachineContext, event: T.MachineEvent): any => ({
  env: {
    ...context.env,
    ...event.payload.env,
  },
  tutorial: event.payload.tutorial,
  position: event.payload.position,
}))

export const initPosition = assign({
  position: (context: T.MachineContext, event: T.MachineEvent): any => {
    const position: T.Position = selectors.initialPosition(context)
    return position
  },
})

export const updateStepPosition = assign({
  position: (context: T.MachineContext, event: T.MachineEvent): any => {
    logger('updateStepPosition', event)
    return event.payload.position
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
    const error: string | null | E.ErrorMessage = event.payload.error
    if (error) {
      if (typeof error === 'string') {
        console.log(`ERROR: ${error}`)
        return error
      } else if (error.type) {
        const errorMessage = errors[error.type]
        const content = errorMessage || ''
        const message = `${content}\n\n${error.message || ''}`
        console.log(`ERROR: ${message}`)
        return {
          ...error,
          message,
        }
      }
    }
    return null
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
