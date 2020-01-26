import * as CR from 'typings'
import { Machine } from 'xstate'
import actions from './actions'

export type MachineEvent =
  | { type: 'ENV_LOAD'; payload: { env: CR.Environment } }
  | { type: 'AUTHENTICATED' }
  | { type: 'ERROR'; payload: { error: Error } }

export type StateSchema = {
  states: {
    LoadEnvironment: {}
    Authenticate: {}
    Authenticated: {}
  }
}

export type MachineContext = {
  env: CR.Environment
  error: CR.ErrorMessage | null
}

const options = {
  actions,
}

export const authenticateMachine = Machine<MachineContext, StateSchema, MachineEvent>(
  {
    id: 'authenticate',
    context: {
      error: null,
      env: { machineId: '', sessionId: '', token: '' },
    },
    initial: 'LoadEnvironment',
    states: {
      LoadEnvironment: {
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
          AUTHENTICATED: 'Authenticated',
          ERROR: {
            actions: ['setError'],
          },
        },
      },
      Authenticated: {
        type: 'final',
      },
    },
  },
  options,
)
