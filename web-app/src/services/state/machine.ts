import { Machine, MachineOptions } from 'xstate'
import * as CR from 'typings'
import actions from './actions'

const options: MachineOptions<CR.MachineContext, CR.MachineEvent> = {
  // @ts-ignore
  actions,
}

export const machine = Machine<CR.MachineContext, CR.MachineStateSchema, CR.MachineEvent>(
  {
    id: 'root',
    initial: 'Start',
    context: {
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
      Tutorial: {
        id: 'tutorial',
        initial: 'Initialize',
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
          COMMAND_ERROR: {
            actions: ['commandError'],
          },
        },
        states: {
          // TODO: move Initialize into New Tutorial setup
          Initialize: {
            onEntry: ['initializeTutorial'],
            on: {
              TUTORIAL_CONFIGURED: 'Summary',
              // TUTORIAL_CONFIG_ERROR: 'Start' // TODO: should handle error
            },
          },
          Summary: {
            on: {
              LOAD_TUTORIAL: {
                target: 'Level',
                actions: ['initPosition', 'initTutorial'],
              },
            },
          },
          LoadNext: {
            id: 'tutorial-load-next',
            onEntry: ['loadNext'],
            on: {
              NEXT_STEP: {
                target: 'Level',
                actions: ['updatePosition'],
              },
              NEXT_LEVEL: {
                target: 'Level', // TODO should return to levels summary page
                actions: ['updatePosition'],
              },
              COMPLETED: '#completed-tutorial',
            },
          },
          Level: {
            initial: 'Load',
            states: {
              Load: {
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
                onEntry: ['syncProgress'],
                on: {
                  LEVEL_NEXT: '#tutorial-load-next',
                },
              },
            },
          },
          Completed: {
            id: 'completed-tutorial',
            onEntry: ['syncProgress', 'userTutorialComplete'],
            on: {
              SELECT_TUTORIAL: {
                target: '#start-new-tutorial',
                actions: ['reset'],
              },
            },
          },
        },
      },
    },
  },
  options,
)

export default machine
