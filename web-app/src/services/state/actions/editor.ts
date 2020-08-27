import * as T from 'typings'
import * as TT from 'typings/tutorial'
import { assign } from 'xstate'
import * as selectors from '../../selectors'

export default (editorSend: any) => ({
  startup(): void {
    editorSend({
      type: 'EDITOR_STARTUP',
    })
  },
  configureNewTutorial(context: T.MachineContext) {
    editorSend({
      type: 'EDITOR_TUTORIAL_CONFIG',
      payload: {
        // pass position because current stepId or first stepId will be empty
        tutorial: context.tutorial,
      },
    })
  },
  continueConfig(context: T.MachineContext) {
    editorSend({
      type: 'EDITOR_TUTORIAL_CONTINUE_CONFIG',
      payload: {
        // pass position because current stepId or first stepId will be empty
        position: context.position,
      },
    })
  },
  loadLevel(context: T.MachineContext): void {
    const level: TT.Level = selectors.currentLevel(context)
    const step: TT.Step | null = selectors.currentStep(context)
    // load step actions
    editorSend({
      type: 'EDITOR_LEVEL_ENTER',
      payload: {
        position: {
          stepId: step?.id || null,
          levelId: level.id,
          complete: false,
        },
        actions: level.setup,
      },
    })
  },
  loadStep(context: T.MachineContext): void {
    const step: TT.Step | null = selectors.currentStep(context)
    if (step && step.setup) {
      // load step actions
      editorSend({
        type: 'EDITOR_STEP_ENTER',
        payload: {
          // set position here
          position: {
            stepId: step.id,
            levelId: context.position.levelId,
            complete: false,
          },
          actions: step.setup,
        },
      })

      if (step.subtasks) {
        // load subtask summary by running tests and parsing result
        editorSend({
          type: 'EDITOR_RUN_TEST',
          payload: {
            position: context.position,
          },
        })
      }
    }
  },
  editorLoadSolution(context: T.MachineContext): void {
    const step: TT.Step | null = selectors.currentStep(context)
    // tell editor to load solution commit
    if (step && step.solution) {
      editorSend({
        type: 'EDITOR_SOLUTION_ENTER',
        payload: {
          position: {
            stepId: step.id,
            levelId: context.position.levelId,
            complete: false,
          },
          actions: step.solution,
        },
      })
    }
  },
  validateSetup() {
    editorSend({
      type: 'EDITOR_VALIDATE_SETUP',
    })
  },
  requestWorkspaceSelect() {
    editorSend({
      type: 'EDITOR_REQUEST_WORKSPACE',
    })
  },
  editorOpenLogs(context: T.MachineContext, event: T.MachineEvent): void {
    editorSend({
      type: 'EDITOR_OPEN_LOGS',
      payload: { channel: event.payload.channel },
    })
  },
  runTest(context: T.MachineContext) {
    editorSend({
      type: 'EDITOR_RUN_TEST',
      payload: { position: context.position },
    })
  },
  runReset(): void {
    editorSend({
      type: 'EDITOR_RUN_RESET_LATEST',
    })
  },
  // @ts-ignore
  runResetToPosition: assign({
    position: (context: T.MachineContext, event: T.MachineEvent) => {
      editorSend({
        type: 'EDITOR_RUN_RESET_POSITION',
        payload: event.payload,
      })
      return event.payload.position
    },
  }),
  syncLevelPosition(context: T.MachineContext): void {
    editorSend({
      type: 'EDITOR_SYNC_POSITION',
      payload: {
        position: context.position,
      },
    })
  },
  onStepComplete(context: T.MachineContext): void {
    editorSend({
      type: 'EDITOR_STEP_COMPLETE',
      payload: {
        tutorialId: context.tutorial?.id || '',
        levelId: context.position.levelId,
        stepId: context.position.stepId,
      },
    })
  },
  onLevelComplete(context: T.MachineContext): void {
    editorSend({
      type: 'EDITOR_LEVEL_COMPLETE',
      payload: {
        tutorialId: context.tutorial?.id || '',
        levelId: context.position.levelId,
      },
    })
  },
  onTutorialComplete(context: T.MachineContext): void {
    editorSend({
      type: 'EDITOR_TUTORIAL_COMPLETE',
      payload: {
        tutorialId: context.tutorial?.id || '',
      },
    })
  },
})
