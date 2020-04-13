import * as T from 'typings'
import * as TT from 'typings/tutorial'
import { assign, send, ActionFunctionMap } from 'xstate'
import * as selectors from '../../selectors'
import onError from '../../../services/sentry/onError'
import logger from 'services/logger'

const contextActions: ActionFunctionMap<T.MachineContext, T.MachineEvent> = {
  // @ts-ignore
  setStart: assign({
    env: (context: T.MachineContext, event: T.MachineEvent) => {
      return {
        ...context.env,
        ...event.payload.env,
      }
    },
  }),
  // @ts-ignore
  storeContinuedTutorial: assign({
    env: (context: T.MachineContext, event: T.MachineEvent) => {
      return {
        ...context.env,
        ...event.payload.env,
      }
    },
    tutorial: (context: T.MachineContext, event: T.MachineEvent) => {
      return event.payload.tutorial
    },
    progress: (context: T.MachineContext, event: T.MachineEvent) => {
      return event.payload.progress
    },
    position: (context: T.MachineContext, event: T.MachineEvent) => {
      return event.payload.position
    },
  }),
  // @ts-ignore
  startNewTutorial: assign({
    position: (context: T.MachineContext, event: T.MachineEvent): any => {
      const position: T.Position = selectors.initialPosition(context)
      return position
    },
    progress: (): T.Progress => {
      return { levels: {}, steps: {}, complete: false }
    },
  }),
  // @ts-ignore
  updateStepPosition: assign({
    position: (context: T.MachineContext, event: T.MachineEvent): any => {
      // TODO calculate from progress

      const { position } = context
      // merge in the updated position
      // sent with the test to ensure consistency
      const level: TT.Level = selectors.currentLevel(context)
      const steps: TT.Step[] = level.steps

      // final step but not completed
      if (steps[steps.length - 1].id === position.stepId) {
        return position
      }

      const stepIndex = steps.findIndex((s: TT.Step) => s.id === position.stepId)

      const step: TT.Step = steps[stepIndex + 1]

      const nextPosition: T.Position = {
        ...position,
        stepId: step.id,
      }

      return nextPosition
    },
  }),
  // @ts-ignore
  updateLevelPosition: assign({
    position: (context: T.MachineContext): any => {
      const { position } = context
      const tutorial = selectors.currentTutorial(context)
      // merge in the updated position
      // sent with the test to ensure consistency
      const levels: TT.Level[] = tutorial.levels

      const levelIndex = levels.findIndex((l: TT.Level) => l.id === position.levelId)
      const level: TT.Level = levels[levelIndex + 1]

      const nextPosition: T.Position = {
        levelId: level.id,
        stepId: level.steps[0].id,
      }

      return nextPosition
    },
  }),
  // @ts-ignore
  updateLevelProgress: assign({
    progress: (context: T.MachineContext, event: T.MachineEvent): any => {
      // update progress by tracking completed
      const { progress, position } = context

      const levelId: string = position.levelId

      progress.levels[levelId] = true

      logger('PROGRESS', progress)

      return progress
    },
  }),
  // @ts-ignore
  updateStepProgress: assign({
    progress: (context: T.MachineContext, event: T.MachineEvent): any => {
      // update progress by tracking completed
      const currentProgress: T.Progress = context.progress

      const { stepId } = event.payload

      currentProgress.steps[stepId] = true

      return currentProgress
    },
  }),
  // @ts-ignore
  updatePosition: assign({
    position: (context: T.MachineContext, event: T.MachineEvent): any => {
      const { position } = event.payload
      return position
    },
  }),
  loadNext: send(
    (context: T.MachineContext): T.Action => {
      const { position, progress } = context

      const level = selectors.currentLevel(context)

      const steps: TT.Step[] = level.steps

      if (steps.length && position.stepId) {
        const stepIndex = steps.findIndex((s: TT.Step) => s.id === position.stepId)
        const stepComplete = progress.steps[position.stepId]
        const finalStep = stepIndex > -1 && stepIndex === steps.length - 1
        const hasNextStep = !finalStep && !stepComplete

        // NEXT STEP
        if (hasNextStep) {
          const nextPosition = { ...position, stepId: steps[stepIndex + 1].id }
          return { type: 'NEXT_STEP', payload: { position: nextPosition } }
        }

        // has next level?
        if (!context.tutorial) {
          const error = new Error('Tutorial not found')
          onError(error)
          throw error
        }
      }

      // @ts-ignore
      const levels = context.tutorial.levels || []
      const levelIndex = levels.findIndex((l: TT.Level) => l.id === position.levelId)
      const finalLevel = levelIndex > -1 && levelIndex === levels.length - 1
      const hasNextLevel = !finalLevel

      // NEXT LEVEL
      if (hasNextLevel) {
        const nextLevel = levels[levelIndex + 1]
        const nextPosition = {
          levelId: nextLevel.id,
          stepId: nextLevel.steps[0].id,
        }
        return { type: 'NEXT_LEVEL', payload: { position: nextPosition } }
      }

      // COMPLETED
      return { type: 'COMPLETED' }
    },
  ),
  stepNext: send(
    (context: T.MachineContext): T.Action => {
      const { position, progress } = context

      const level: TT.Level = selectors.currentLevel(context)

      const { steps } = level

      if (steps.length && position.stepId) {
        const stepIndex = steps.findIndex((s: TT.Step) => s.id === position.stepId)
        const finalStep = stepIndex === steps.length - 1
        const stepComplete = progress.steps[position.stepId]
        // not final step, or final step but not complete
        const hasNextStep = !finalStep || !stepComplete

        if (hasNextStep) {
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
    },
  ),
  // @ts-ignore
  reset: assign({
    tutorial() {
      return null
    },
    progress(): T.Progress {
      const progress: T.Progress = selectors.defaultProgress()
      return progress
    },
    position(): T.Position {
      const position: T.Position = selectors.defaultPosition()
      return position
    },
    processes() {
      return []
    },
  }),
  // @ts-ignore
  setError: assign({
    error: (context: T.MachineContext, event: T.MachineEvent): any => {
      const message: string | null = event.payload.error
      return message
    },
  }),
  // @ts-ignore
  clearError: assign({
    error: (): any => null,
  }),
  // @ts-ignore
  checkLevelCompleted: send((context: T.MachineContext) => {
    // no step id indicates no steps to complete
    return {
      type: context.position.stepId === null ? 'START_COMPLETED_LEVEL' : 'START_LEVEL',
    }
  }),
  // @ts-ignore
  setTutorialContext: assign({
    tutorial: (context: T.MachineContext, event: T.MachineEvent): any => {
      return event.payload.tutorial
    },
  }),
}

export default contextActions
