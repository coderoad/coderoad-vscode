import * as T from 'typings'
import * as TT from 'typings/tutorial'
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
      type: 'SETUP_ACTIONS',
      payload: {
        position: {
          stepId: step?.id || null,
          levelId: level.id,
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
        type: 'SETUP_ACTIONS',
        payload: {
          // set position here
          position: {
            stepId: step.id,
            levelId: context.position.levelId,
          },
          actions: step.setup,
        },
      })

      if (step.setup.subtasks) {
        // load subtask summary by running tests and parsing result
        editorSend({
          type: 'EDITOR_RUN_TEST',
          payload: {
            position: context.position,
            subtasks: true,
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
        type: 'SOLUTION_ACTIONS',
        payload: {
          position: {
            stepId: step.id,
            levelId: context.position.levelId,
          },
          actions: step.solution,
        },
      })
    }
  },
  syncLevelProgress(context: T.MachineContext): void {
    editorSend({
      type: 'EDITOR_SYNC_PROGRESS',
      payload: {
        progress: context.progress,
      },
    })
  },
  clearStorage(): void {
    editorSend({ type: 'TUTORIAL_CLEAR' })
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
})
