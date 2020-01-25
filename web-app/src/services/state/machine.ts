import * as CR from 'typings'
import { Machine } from 'xstate'
import { selectTutorialMachine } from './selectTutorial'
import { playTutorialMachine } from './playTutorial'

export const machine = Machine<CR.MachineContext, CR.MachineStateSchema, CR.MachineEvent>({
  id: 'root',
  initial: 'SelectTutorial',
  context: {
    error: null,
    env: { machineId: '', sessionId: '', token: '' },
    tutorial: null,
  },
  states: {
    // start/continue a tutorial
    // select tutorial
    // view tutorial summary
    SelectTutorial: {
      invoke: {
        src: selectTutorialMachine,
        onDone: 'PlayTutorial',
        data: {
          env: (context: CR.MachineContext) => context.env,
          tutorial: (context: CR.MachineContext) => context.tutorial,
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
          context: (context: CR.MachineContext) => context.env,
          tutorial: (context: CR.MachineContext) => context.tutorial,
          error: null,
        },
      },
    },
  },
})

export default machine
