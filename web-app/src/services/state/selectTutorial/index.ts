import * as CR from 'typings'
import { Machine, MachineOptions } from 'xstate'
import actions from './actions'

const options: MachineOptions<CR.MachineContext, CR.MachineEvent> = {
  activities: {},
  actions,
  guards: {},
  services: {},
  delays: {},
}

export const selectTutorialMachine = Machine<CR.MachineContext, CR.SelectTutorialMachineStateSchema, CR.MachineEvent>(
  {
    initial: 'Startup',
    states: {
      Startup: {
        onEntry: ['loadEnv'],
        on: {
          ENV_LOAD: {
            target: 'Authenticate',
            actions: ['setEnv'],
          },
        },
      },
      Authenticate: {
        onEntry: ['authenticate'],
        on: {
          AUTHENTICATED: 'NewOrContinue',
          ERROR: {
            actions: ['setError'],
          },
        },
      },
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
          SELECTED: 'Summary',
        },
      },
      Summary: {
        on: {
          BACK: 'SelectTutorial',
          LOAD_TUTORIAL: {
            target: 'Configure',
            actions: ['newTutorial', 'initTutorial'],
          },
        },
      },
      Configure: {
        onEntry: ['clearStorage, configureTutorial'],
        on: {
          TUTORIAL_CONFIGURED: 'Launch',
          // TUTORIAL_CONFIG_ERROR: 'Start' // TODO should handle error
        },
      },
      Launch: {
        // awaits tutorial configuration
        on: {
          LOAD_TUTORIAL: {
            type: 'final',
          },
        },
      },
      ContinueTutorial: {
        on: {
          TUTORIAL_START: {
            type: 'final',
            actions: ['continueConfig'],
          },
          TUTORIAL_SELECT: 'SelectTutorial',
        },
      },
    },
  },
  options,
)
