import * as CR from 'typings'
import * as TT from 'typings/tutorial'
import * as selectors from '../../selectors'

export default (editorSend: any) => ({
  loadEnv(): void {
    editorSend({
      type: 'EDITOR_ENV_GET',
    })
  },
  loadStoredTutorial(): void {
    // send message to editor to see if there is existing tutorial progress
    // in local storage on the editor
    editorSend({
      type: 'EDITOR_TUTORIAL_LOAD',
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
        stepId: context.position.stepId,
      },
    })
  },
  loadLevel(context: CR.MachineContext): void {
    const level: TT.Level = selectors.currentLevel(context)
    if (level.setup) {
      // load step actions
      editorSend({
        type: 'SETUP_ACTIONS',
        payload: level.setup,
      })
    }
  },
  loadStep(context: CR.MachineContext): void {
    const step: TT.Step | null = selectors.currentStep(context)
    if (step && step.setup) {
      // load step actions
      editorSend({
        type: 'SETUP_ACTIONS',
        payload: {
          stepId: step.id,
          ...step.setup,
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
          stepId: step.id,
          ...step.solution,
        },
      })
    }
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
