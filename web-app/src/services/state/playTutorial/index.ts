import * as CR from 'typings'
import { Machine, MachineOptions } from 'xstate'
import actions from './actions'

const options: MachineOptions<CR.PlayMachineContext, CR.MachineEvent> = {
  activities: {},
  actions,
  guards: {},
  services: {},
  delays: {},
}

export const playTutorialMachine = Machine<CR.PlayMachineContext, CR.PlayTutorialMachineStateSchema, CR.MachineEvent>(
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
    onEntry: ['initPosition', 'initTutorial'],
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
              LEVEL_NEXT: '#tutorial-load-next',
            },
          },
        },
      },
      Completed: {
        id: 'completed-tutorial',
        onEntry: ['userTutorialComplete'],
        on: {
          SELECT_TUTORIAL: {
            type: 'final',
          },
        },
      },
    },
  },
  options,
)
