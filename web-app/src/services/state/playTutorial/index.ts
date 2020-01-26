import * as CR from 'typings'
import * as G from 'typings/graphql'
import { Machine, MachineOptions } from 'xstate'
import actions from './actions'

export type StateSchema = {
  states: {
    LoadNext: {}
    Level: {
      states: {
        Loading: {}
        Normal: {}
        TestRunning: {}
        TestPass: {}
        TestFail: {}
        TestError: {}
        StepNext: {}
        LevelComplete: {}
      }
    }
    Completed: {}
    Exit: {}
  }
}

export type MachineEvent =
  | { type: 'COMMAND_START'; payload: { process: CR.ProcessEvent } }
  | { type: 'COMMAND_SUCCESS'; payload: { process: CR.ProcessEvent } }
  | { type: 'COMMAND_FAIL'; payload: { process: CR.ProcessEvent } }
  | { type: 'ERROR'; payload: { error: string } }
  | { type: 'NEXT_STEP'; payload: { position: CR.Position } }
  | { type: 'NEXT_LEVEL'; payload: { position: CR.Position } }
  | { type: 'COMPLETED' }
  | { type: 'TEST_RUNNING'; payload: { stepId: string } }
  | { type: 'STEP_SOLUTION_LOAD' }
  | { type: 'TEST_PASS'; payload: { stepId: string } }
  | { type: 'TEST_FAIL'; payload: { stepId: string } }
  | { type: 'TEST_ERROR'; payload: { stepId: string } }
  | { type: 'LOAD_NEXT_STEP'; payload: { step: string } }
  | { type: 'LEVEL_COMPLETE' }
  | { type: 'EXIT' }

export type MachineContext = {
  error: CR.ErrorMessage | null
  env: CR.Environment
  tutorial: G.Tutorial | null
  position: CR.Position
  progress: CR.Progress
  processes: CR.ProcessEvent[]
}

const options: MachineOptions<MachineContext, MachineEvent> = {
  activities: {},
  actions,
  guards: {},
  services: {},
  delays: {},
}

export const playTutorialMachine = Machine<MachineContext, StateSchema, MachineEvent>(
  {
    context: {
      error: null,
      env: { machineId: '', sessionId: '', token: '' },
      tutorial: null,
      position: { levelId: '', stepId: '' },
      progress: {
        levels: {},
        steps: {},
        complete: false,
      },
      processes: [],
    },
    id: 'tutorial',
    initial: 'Level',
    onEntry: ['initTutorial'],
    on: {
      // track commands
      COMMAND_START: {
        actions: ['commandStart'],
      },
      COMMAND_SUCCESS: {
        actions: ['commandSuccess'],
      },
      COMMAND_FAIL: {
        actions: ['commandFail'],
      },
      ERROR: {
        actions: ['setError'],
      },
    },
    states: {
      LoadNext: {
        id: 'tutorial-load-next',
        onEntry: ['loadNext'],
        on: {
          NEXT_STEP: {
            target: 'Level',
            actions: ['updatePosition'],
          },
          NEXT_LEVEL: {
            target: 'Level',
            actions: ['updatePosition'],
          },
          COMPLETED: '#completed-tutorial',
        },
      },
      Level: {
        id: 'level',
        initial: 'Loading',
        states: {
          Loading: {
            onEntry: ['loadLevel', 'loadStep'],
            after: {
              0: 'Normal',
            },
          },
          Normal: {
            id: 'tutorial-level',
            on: {
              TEST_RUNNING: 'TestRunning',
              STEP_SOLUTION_LOAD: {
                actions: ['editorLoadSolution'],
              },
            },
          },
          TestRunning: {
            onEntry: ['testStart'],
            on: {
              TEST_PASS: {
                target: 'TestPass',
                actions: ['updateStepProgress'],
              },
              TEST_FAIL: 'TestFail',
              TEST_ERROR: 'TestError',
            },
          },
          TestError: {
            onEntry: ['testFail'],
            after: {
              0: 'Normal',
            },
          },
          TestPass: {
            onExit: ['updateStepPosition'],
            after: {
              1000: 'StepNext',
            },
          },
          TestFail: {
            onEntry: ['testFail'],
            after: {
              0: 'Normal',
            },
          },
          StepNext: {
            onEntry: ['stepNext'],
            on: {
              LOAD_NEXT_STEP: {
                target: 'Normal',
                actions: ['loadStep'],
              },
              LEVEL_COMPLETE: {
                target: 'LevelComplete',
                actions: ['updateLevelProgress'],
              },
            },
          },
          LevelComplete: {
            on: {
              NEXT_LEVEL: '#tutorial-load-next',
            },
          },
        },
      },
      Completed: {
        id: 'completed-tutorial',
        onEntry: ['userTutorialComplete'],
        on: {
          EXIT: 'Exit',
        },
      },
      Exit: {
        type: 'final',
      },
    },
  },
  options,
)
