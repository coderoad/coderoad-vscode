import * as CR from 'typings'
import * as G from 'typings/graphql'
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
    const level: G.Level = selectors.currentLevel(context)
    if (level.setup) {
      // load step actions
      editorSend({
        type: 'SETUP_ACTIONS',
        payload: level.setup,
      })
    }
  },
  loadStep(context: CR.MachineContext): void {
    const step: G.Step = selectors.currentStep(context)
    if (step.setup) {
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
    const step: G.Step = selectors.currentStep(context)
    // tell editor to load solution commit
    editorSend({
      type: 'SOLUTION_ACTIONS',
      payload: {
        stepId: step.id,
        ...step.solution,
      },
    })
  },
  clearStorage(): void {
    editorSend({ type: 'TUTORIAL_CLEAR' })
  },
  checkEmptyWorkspace() {
    editorSend({
      type: 'EDITOR_CHECK_WORKSPACE',
    })
  },
  requestWorkspaceSelect() {
    editorSend({
      type: 'EDITOR_REQUEST_WORKSPACE',
    })
  },
})
