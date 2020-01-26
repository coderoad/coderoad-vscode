import * as CR from 'typings'
import * as G from 'typings/graphql'
import { SelectTutorialEvents } from 'typings/events'
import { Machine, MachineOptions } from 'xstate'
import actions from './actions'

export type MachineContext = {
  error: CR.ErrorMessage | null
  tutorial: G.Tutorial | null
  position: CR.Position
  progress: CR.Progress
}

export type StateSchema = {
  states: {
    NewOrContinue: {}
    SelectTutorial: {}
    Summary: {}
    InitializeTutorial: {}
    ContinueTutorial: {}
    Launch: {}
  }
}

const options: MachineOptions<MachineContext, SelectTutorialEvents> = {
  activities: {},
  actions,
  guards: {},
  services: {},
  delays: {},
}

export const selectTutorialMachine = Machine<MachineContext, StateSchema, SelectTutorialEvents>(
  {
    context: {
      error: null,
      tutorial: null,
      progress: { levels: {}, steps: {}, complete: false },
      position: { levelId: '', stepId: '' },
    },
    initial: 'NewOrContinue',
    states: {
      NewOrContinue: {
        onEntry: ['loadStoredTutorialIfExists'],
        on: {
          CAN_CONTINUE: {
            target: 'ContinueTutorial',
            actions: ['continueTutorial'],
          },
          NO_CONTINUE: 'SelectTutorial',
        },
      },
      SelectTutorial: {
        on: {
          TUTORIAL_SELECTED: 'Summary',
        },
      },
      Summary: {
        on: {
          BACK: 'SelectTutorial',
          LOAD_TUTORIAL: {
            actions: ['clearStorage', 'newTutorial'],
            target: 'InitializeTutorial',
          },
        },
      },
      InitializeTutorial: {
        // await configuration
        onEntry: ['initializeTutorial'],
        on: {
          TUTORIAL_CONFIGURED: 'Launch',
          // TUTORIAL_CONFIG_ERROR: 'Start' // TODO should handle error
        },
      },
      ContinueTutorial: {
        on: {
          CHOOSE_CONTINUE: {
            target: 'Launch',
            actions: ['continueConfig'],
          },
          CHOOSE_NEW: 'SelectTutorial',
        },
      },
      Launch: {
        type: 'final',
      },
    },
  },
  options,
)
