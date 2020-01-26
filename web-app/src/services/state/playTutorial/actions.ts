import * as CR from 'typings'
import * as G from 'typings/graphql'
import * as Event from 'typings/events'
import { assign, send, ActionFunctionMap } from 'xstate'
import { MachineContext } from './index'
import channel from '../../channel'
import onError from '../../sentry/onError'
import * as selectors from '../../selectors'

const actions: ActionFunctionMap<MachineContext, Event.PlayTutorialEvents> = {
  userTutorialComplete(context: MachineContext) {
    console.log('should update user tutorial as complete')
  },
  // @ts-ignore
  commandStart: assign({
    processes: (
      context: MachineContext,
      event: { type: 'COMMAND_START'; payload: { process: CR.ProcessEvent } },
    ): CR.ProcessEvent[] => {
      // only add processes that aren't already running
      const currentProcesses: CR.ProcessEvent[] = context.processes
      const { process } = event.payload
      const isRunning: CR.ProcessEvent | undefined = currentProcesses.find(p => p.title === process.title)
      if (!isRunning) {
        // if not running, add it to the list
        currentProcesses.push(process)
      }
      return currentProcesses
    },
  }),
  // @ts-ignore
  commandSuccess: assign({
    processes: ({ processes }: MachineContext, event: Event.CommandSuccessEvent): CR.ProcessEvent[] => {
      const { process } = event.payload
      return processes.filter(p => p.title !== process.title)
    },
  }),
  // @ts-ignore
  commandFail: assign({
    processes: ({ processes }: MachineContext, event: Event.CommandFailEvent): CR.ProcessEvent[] => {
      const { process } = event.payload
      return processes.filter(p => p.title !== process.title)
    },
  }),
  // @ts-ignore
  updateStepPosition: assign({
    position: (context: MachineContext, event: Event.PlayTutorialEvents): CR.Position => {
      // TODO calculate from progress

      const { position } = context
      // merge in the updated position
      // sent with the test to ensure consistency
      const level: G.Level = selectors.currentLevel(context)
      const steps: G.Step[] = level.steps

      // final step but not completed
      if (steps[steps.length - 1].id === position.stepId) {
        return position
      }

      const stepIndex = steps.findIndex((s: G.Step) => s.id === position.stepId)

      const step: G.Step = steps[stepIndex + 1]

      const nextPosition: CR.Position = {
        ...position,
        stepId: step.id,
      }

      return nextPosition
    },
  }),
  // @ts-ignore
  updateLevelPosition: assign({
    position: (context: MachineContext): CR.Position => {
      const { position } = context
      const version = selectors.currentVersion(context)
      // merge in the updated position
      // sent with the test to ensure consistency
      const levels: G.Level[] = version.data.levels

      const levelIndex = levels.findIndex((l: G.Level) => l.id === position.levelId)
      const level: G.Level = levels[levelIndex + 1]

      const nextPosition: CR.Position = {
        levelId: level.id,
        stepId: level.steps[0].id,
      }

      return nextPosition
    },
  }),
  // @ts-ignore
  updateLevelProgress: assign({
    progress: (context: MachineContext, event: Event.PlayTutorialEvents): CR.Progress => {
      // update progress by tracking completed
      const { progress, position } = context

      const levelId: string = position.levelId

      progress.levels[levelId] = true

      return progress
    },
  }),
  // @ts-ignore
  updateStepProgress: assign({
    progress: (context: MachineContext, event: Event.TestPassEvent): CR.Progress => {
      // update progress by tracking completed
      const currentProgress: CR.Progress = context.progress

      const { stepId } = event.payload

      currentProgress.steps[stepId] = true

      return currentProgress
    },
  }),
  // @ts-ignore
  updatePosition: assign({
    position: (context: MachineContext, event: Event.NextStepEvent | Event.NextLevelEvent): CR.Position => {
      const { position } = event.payload
      return position
    },
  }),
  loadNext: send(
    (context: MachineContext): CR.Action => {
      const { position, progress } = context

      const level = selectors.currentLevel(context)

      const steps: G.Step[] = level.steps

      const stepIndex = steps.findIndex((s: G.Step) => s.id === position.stepId)
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

      const levels = context.tutorial.version.data.levels || []
      const levelIndex = levels.findIndex((l: G.Level) => l.id === position.levelId)
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
    (context: MachineContext): CR.Action => {
      const { position, progress } = context

      const level: G.Level = selectors.currentLevel(context)

      const { steps } = level
      // TODO verify not -1
      const stepIndex = steps.findIndex((s: G.Step) => s.id === position.stepId)
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
      } else {
        return {
          type: 'LEVEL_COMPLETE',
        }
      }
    },
  ),
  // @ts-ignore
  setError: assign({
    error: (context: MachineContext, event: Event.ErrorMessageEvent): string | null => {
      return event.payload.title
    },
  }),
  loadLevel(context: MachineContext): void {
    const level: G.Level = selectors.currentLevel(context)
    if (level.setup) {
      // load step actions
      channel.editorSend({
        type: 'SETUP_ACTIONS',
        payload: level.setup,
      })
    }
  },
  loadStep(context: MachineContext): void {
    const step: G.Step = selectors.currentStep(context)
    if (step.setup) {
      // load step actions
      channel.editorSend({
        type: 'SETUP_ACTIONS',
        payload: {
          stepId: step.id,
          ...step.setup,
        },
      })
    }
  },
  editorLoadSolution(context: MachineContext): void {
    const step: G.Step = selectors.currentStep(context)
    // tell editor to load solution commit
    channel.editorSend({
      type: 'SOLUTION_ACTIONS',
      payload: {
        stepId: step.id,
        ...step.solution,
      },
    })
  },
  clearStorage(): void {
    channel.editorSend({ type: 'EDITOR_CLEAR_TUTORIAL_STORAGE' })
  },
}

export default actions
