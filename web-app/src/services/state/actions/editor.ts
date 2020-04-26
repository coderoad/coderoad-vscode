import * as CR from 'typings'
import * as TT from 'typings/tutorial'
import * as selectors from '../../selectors'

export default (editorSend: any) => ({
  startup(): void {
    editorSend({
      type: 'EDITOR_STARTUP',
    })
  },
  configureNewTutorial(context: CR.MachineContext) {
    editorSend({
      type: 'EDITOR_TUTORIAL_CONFIG',
      payload: {
        // pass position because current stepId or first stepId will be empty
        tutorial: context.tutorial,
      },
    })
  },
  continueConfig(context: CR.MachineContext) {
    editorSend({
      type: 'EDITOR_TUTORIAL_CONTINUE_CONFIG',
      payload: {
        // pass position because current stepId or first stepId will be empty
        position: context.position,
      },
    })
  },
  loadLevel(context: CR.MachineContext): void {
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
  loadStep(context: CR.MachineContext): void {
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
    }
  },
  editorLoadSolution(context: CR.MachineContext): void {
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
  syncLevelProgress(context: CR.MachineContext): void {
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
})
