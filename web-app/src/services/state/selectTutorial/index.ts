import * as CR from 'typings'
import { Machine, MachineOptions } from 'xstate'
import actions from './actions'

const options: MachineOptions<CR.MachineContext, CR.MachineEvent> = {
  // @ts-ignore
  actions,
}

export const selectTutorialMachine = Machine<CR.MachineContext, CR.SelectTutorialMachineStateSchema, CR.MachineEvent>(
  {
    states: {
      Start: {
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
            onEntry: ['clearStorage'],
            id: 'start-new-tutorial',
            on: {
              TUTORIAL_START: {
                target: '#tutorial',
                actions: ['newTutorial'],
              },
            },
          },
          ContinueTutorial: {
            on: {
              TUTORIAL_START: {
                target: '#tutorial-level',
                actions: ['continueConfig'],
              },
              TUTORIAL_SELECT: 'SelectTutorial',
            },
          },
        },
      },
    },
  },
  options,
)
