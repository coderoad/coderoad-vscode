import * as CR from 'typings'
import { Machine, MachineOptions } from 'xstate'
import createActions from './actions'

const createOptions = ({ editorSend }: any): MachineOptions<CR.MachineContext, CR.MachineEvent> => ({
  activities: {},
  // @ts-ignore
  actions: createActions(editorSend),
  guards: {},
  services: {},
  delays: {},
})

export const createMachine = (options: any) => {
  return Machine<CR.MachineContext, CR.MachineStateSchema, CR.MachineEvent>(
    {
      id: 'root',
      initial: 'Setup',
      context: {
        error: null,
        env: { machineId: '', sessionId: '', token: '' },
        tutorial: null,
        position: { levelId: '', stepId: null },
        progress: {
          levels: {},
          steps: {},
          complete: false,
        },
        processes: [],
        testStatus: null,
      },
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
          // TODO: missing clearError
          actions: ['setError'],
        },
      },
      states: {
        Setup: {
          initial: 'Startup',
          states: {
            Startup: {
              onEntry: ['startup'],
              onExit: ['clearError'],
              on: {
                EDITOR_STARTUP_FAILED: {
                  actions: ['setError'],
                },
                NO_WORKSPACE: {
                  actions: ['setError'],
                },
                REQUEST_WORKSPACE: {
                  actions: 'requestWorkspaceSelect',
                },
                LOAD_STORED_TUTORIAL: {
                  target: 'Start',
                  actions: ['loadContinuedTutorial'],
                },
                START_NEW_TUTORIAL: {
                  target: 'Start',
                  actions: ['setStart'],
                },
                START_TUTORIAL_FROM_URL: {
                  target: 'SetupNewTutorial',
                  actions: ['setTutorialContext'],
                },
                // TODO: handle completed tutorial differently
                TUTORIAL_ALREADY_COMPLETE: {
                  target: 'Start',
                  actions: ['setStart'],
                },
              },
            },
            ValidateSetup: {
              onEntry: ['validateSetup'],
              onExit: ['clearError'],
              on: {
                VALIDATE_SETUP_FAILED: {
                  actions: ['setError'],
                },
                RETRY: 'ValidateSetup',
                REQUEST_WORKSPACE: {
                  actions: 'requestWorkspaceSelect',
                },
                WORKSPACE_LOADED: 'ValidateSetup',
                SETUP_VALIDATED: 'SelectTutorial',
              },
            },
            Start: {
              onExit: ['clearError'],
              on: {
                NEW_TUTORIAL: 'ValidateSetup',
                CONTINUE_TUTORIAL: {
                  target: '#tutorial',
                  actions: ['continueConfig'],
                },
                CONTINUE_FAILED: {
                  actions: ['setError'],
                },
              },
            },
            SelectTutorial: {
              onEntry: ['clearStorage'],
              id: 'select-new-tutorial',
              on: {
                TUTORIAL_START: {
                  target: 'SetupNewTutorial',
                  actions: ['setTutorialContext'],
                },
              },
            },
            SetupNewTutorial: {
              onEntry: ['configureNewTutorial'],
              onExit: ['clearError'],
              on: {
                TUTORIAL_CONFIGURE_FAIL: {
                  actions: ['setError'],
                },
                TRY_AGAIN: 'SetupNewTutorial',
                TUTORIAL_CONFIGURED: 'StartTutorial',
              },
            },
            StartTutorial: {
              onEntry: ['initProgressPosition'],
              after: {
                0: '#tutorial',
              },
            },
          },
        },
        Tutorial: {
          id: 'tutorial',
          initial: 'Level',
          states: {
            Level: {
              initial: 'Load',
              states: {
                Load: {
                  onEntry: ['loadLevel', 'loadStep', 'checkLevelCompleted'],
                  on: {
                    START_LEVEL: 'Normal',
                    START_COMPLETED_LEVEL: 'LevelComplete',
                  },
                },
                Normal: {
                  id: 'tutorial-level',
                  on: {
                    LOAD_TEST_SUBTASKS: {
                      actions: ['testSubtasks'],
                    },
                    TEST_RUNNING: 'TestRunning',
                    STEP_SOLUTION_LOAD: {
                      actions: ['editorLoadSolution'],
                    },
                    OPEN_LOGS: {
                      actions: ['editorOpenLogs'],
                    },
                    RUN_TEST: {
                      actions: ['runTest'],
                    },
                  },
                },
                TestRunning: {
                  onEntry: ['testStart'],
                  on: {
                    TEST_PASS: {
                      target: 'TestPass',
                      actions: ['updateStepProgress', 'testPass'],
                    },
                    TEST_FAIL: {
                      target: 'TestFail',
                      actions: ['testFail'],
                    },
                    TEST_ERROR: {
                      target: 'TestFail',
                      actions: ['testFail'],
                    },
                  },
                },
                TestPass: {
                  onExit: ['updateStepPosition'],
                  after: {
                    1000: 'StepNext',
                  },
                },
                TestFail: {
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
                    LEVEL_COMPLETE: 'LevelComplete',
                  },
                },
                LevelComplete: {
                  onEntry: ['updateLevelProgress'],
                  onExit: ['syncLevelProgress'],
                  on: {
                    NEXT_LEVEL: {
                      target: 'LoadNext',
                      actions: ['testClear', 'updatePosition'],
                    },
                  },
                },
                LoadNext: {
                  id: 'tutorial-load-next',
                  onEntry: ['loadNext'],
                  on: {
                    NEXT_STEP: {
                      target: 'Load',
                      actions: ['updatePosition'],
                    },
                    NEXT_LEVEL: {
                      target: 'Load',
                      actions: ['updatePosition'],
                    },
                    COMPLETED: '#completed-tutorial',
                  },
                },
              },
            },
            Completed: {
              id: 'completed-tutorial',
              onEntry: ['userTutorialComplete'], // unusued
              on: {
                SELECT_TUTORIAL: {
                  target: '#select-new-tutorial',
                  actions: ['reset'],
                },
              },
            },
          },
        },
      },
    },
    createOptions(options),
  )
}
