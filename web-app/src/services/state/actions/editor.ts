import * as CR from 'typings'
import * as TT from 'typings/tutorial'
import * as selectors from '../../selectors'
import logger from 'services/logger'

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
        stepId: context.position.stepId,
      },
    })
  },
  loadLevel(context: CR.MachineContext): void {
    const level: TT.Level = selectors.currentLevel(context)
    logger('loadLevel', level)
    if (level.setup) {
      // load step actions
      editorSend({
        type: 'SETUP_ACTIONS',
        payload: {
          actions: level.setup,
        },
      })
    }
    // ensure level step is loaded before first step
    const firstStep = selectors.currentStep(context)
    logger('loadFirstStep', firstStep)
    if (firstStep) {
      editorSend({
        type: 'SETUP_ACTIONS',
        payload: {
          actions: firstStep.setup,
          stepId: firstStep.id,
        },
      })
    }
  },
  loadStep(context: CR.MachineContext): void {
    const step: TT.Step | null = selectors.currentStep(context)
    logger('loadStep', step)
    if (step && step.setup) {
      // load step actions
      editorSend({
        type: 'SETUP_ACTIONS',
        payload: {
          actions: step.setup,
          stepId: step.id,
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
