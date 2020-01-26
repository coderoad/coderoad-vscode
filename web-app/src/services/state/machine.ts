import * as CR from 'typings'
import * as G from 'typings/graphql'
import { Machine } from 'xstate'
import { authenticateMachine } from './authenticate'
import { selectTutorialMachine } from './selectTutorial'
import { playTutorialMachine } from './playTutorial'

export type MachineContext = {
  env: CR.Environment
  error: CR.ErrorMessage | null
  tutorial: G.Tutorial | null
  position: CR.Position
  progress: CR.Progress
}

export type MachineStateSchema = {
  states: {
    Initializing: {}
    Start: {}
    PlayTutorial: {}
  }
}

export const machine = Machine<MachineContext, MachineStateSchema>({
  id: 'root',
  initial: 'Initializing',
  context: {
    error: null,
    env: { machineId: '', sessionId: '', token: '' },
    tutorial: null,
    progress: { levels: {}, steps: {}, complete: false },
    position: { levelId: '', stepId: '' },
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
          tutorial: (context: MachineContext) => context.tutorial,
          error: null,
          position: (context: MachineContext) => context.position,
          progress: (context: MachineContext) => context.progress,
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
