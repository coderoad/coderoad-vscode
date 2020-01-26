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
    Configure: {}
    ContinueTutorial: {}
    LoadingNew: {}
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
        onEntry: ['loadStoredTutorial'],
        on: {
          CONTINUE_TUTORIAL: {
            target: 'ContinueTutorial',
            actions: ['continueTutorial'],
          },
          NEW_TUTORIAL: {
            target: 'SelectTutorial',
          },
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
            actions: ['newTutorial', 'initTutorial'],
            target: 'Configure',
          },
        },
      },
      Configure: {
        onEntry: ['clearStorage, configureTutorial'],
        on: {
          TUTORIAL_CONFIGURED: 'LoadingNew',
          // TUTORIAL_CONFIG_ERROR: 'Start' // TODO should handle error
        },
      },
      ContinueTutorial: {
        on: {
          TUTORIAL_START: 'ContinueLaunch',
          SELECT_NEW_TUTORIAL: 'SelectTutorial',
        },
      },
      LoadingNew: {
        // awaits tutorial configuration
        on: {
          LOAD_TUTORIAL: {
            target: 'Launch',
            actions: ['initPositionAndProgress'],
          },
        },
      },
      Launch: {
        // onEntry: ['continueConfig'],
        type: 'final',
      },
    },
  },
  options,
)
