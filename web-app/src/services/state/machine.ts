import * as CR from 'typings'
import * as G from 'typings/graphql'
import { Machine } from 'xstate'
import { authenticateMachine } from './authenticate'
import { selectTutorialMachine } from './selectTutorial'
import { playTutorialMachine } from './playTutorial'

export type MachineEvent = {
  type: 'NONE'
}

export type MachineContext = {
  env: CR.Environment
  error: CR.ErrorMessage | null
  tutorial: G.Tutorial | null
}

export type MachineStateSchema = {
  states: {
    Initializing: {}
    Start: {}
    PlayTutorial: {}
  }
}

export const machine = Machine<MachineContext, MachineStateSchema, MachineEvent>({
  id: 'root',
  initial: 'Initializing',
  context: {
    error: null,
    env: { machineId: '', sessionId: '', token: '' },
    tutorial: null,
  },
  states: {
    // load environment
    // authenticate with environment
    Initializing: {
      invoke: {
        src: authenticateMachine,
        onDone: 'Start',
        data: {
          env: (context: MachineContext) => context.env,
          error: null,
        },
      },
    },

    // start/continue a tutorial
    // select tutorial
    // view tutorial summary
    Start: {
      invoke: {
        src: selectTutorialMachine,
        onDone: 'PlayTutorial',
        data: {
          env: (context: MachineContext) => context.env,
          tutorial: (context: MachineContext) => context.tutorial,
          error: null,
        },
      },
    },

    // initialize a selected tutorial
    // progress through tutorial level/steps
    // complete tutorial
    PlayTutorial: {
      invoke: {
        src: playTutorialMachine,
        onDone: 'SelectTutorial',
        data: {
          context: (context: MachineContext) => context.env,
          tutorial: (context: MachineContext) => context.tutorial,
          error: null,
        },
      },
    },
  },
})

export default machine
