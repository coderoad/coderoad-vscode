import * as CR from 'typings'
import * as G from 'typings/graphql'
import { Machine, MachineOptions } from 'xstate'
import actions from './actions'

export type MachineEvent =
  | { type: 'CONTINUE_TUTORIAL'; payload: { tutorial: G.Tutorial; progress: CR.Progress; position: CR.Position } }
  | { type: 'NEW_TUTORIAL' }
  | { type: 'BACK' }
  | { type: 'TUTORIAL_SELECTED'; payload: { tutorial: G.Tutorial } }
  | { type: 'LOAD_TUTORIAL'; payload: { tutorial: G.Tutorial } }
  | { type: 'TUTORIAL_CONFIGURED' }
  | { type: 'SELECT_NEW_TUTORIAL'; payload: { tutorial: G.Tutorial } }
  | { type: 'TUTORIAL_START' }
// | { type: 'ERROR'; payload: { error: Error } }

export type MachineContext = {
  env: CR.Environment
  // error: CR.ErrorMessage | null
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

const options: MachineOptions<MachineContext, MachineEvent> = {
  activities: {},
  actions,
  guards: {},
  services: {},
  delays: {},
}

export const selectTutorialMachine = Machine<MachineContext, StateSchema, MachineEvent>(
  {
    context: {
      // error: null,
      env: { machineId: '', sessionId: '', token: '' },
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
          LOAD_TUTORIAL: 'Launch',
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
