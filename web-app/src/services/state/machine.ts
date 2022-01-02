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
        position: { levelId: '', stepId: null, complete: false },
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
                  target: '#tutorial',
                  actions: ['loadContinuedTutorial', 'continueConfig'],
                },
                START_NEW_TUTORIAL: {
                  target: 'Start',
                  actions: ['setStart'],
                },
                START_TUTORIAL_FROM_URL: {
                  target: 'SetupNewTutorial',
                  actions: ['setTutorialContext'],
                },
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
              onEntry: ['initPosition'],
              after: {
                0: '#tutorial',
              },
            },
          },
        },
        Tutorial: {
          id: 'tutorial',
          initial: 'Level',
          on: {
            RUN_RESET_TO_POSITION: {
              actions: ['runResetToPosition'],
              target: 'Tutorial.Level',
            },
          },
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
                    LOAD_SUBTASK_RESULTS: {
                      actions: ['testSubtasks'],
                    },
                    START_TEST: 'TestRunning',
                    STEP_SOLUTION_LOAD: {
                      actions: ['editorLoadSolution'],
                    },
                    OPEN_LOGS: {
                      actions: ['editorOpenLogs'],
                    },
                    RUN_TEST: {
                      actions: ['runTest'],
                    },
                    RUN_RESET: '#reset-tutorial',
                    KEY_PRESS_ENTER: {
                      actions: ['runTest'],
                    },
                  },
                },
                TestRunning: {
                  onEntry: ['testStart'],
                  on: {
                    TEST_PASS: {
                      target: 'StepNext',
                      actions: ['onStepComplete', 'testPass', 'updateStepPosition'],
                    },
                    TEST_FAIL: {
                      target: 'Normal',
                      actions: ['testFail'],
                    },
                    TEST_ERROR: {
                      target: 'Normal',
                      actions: ['testFail'],
                    },
                  },
                },
                StepNext: {
                  onEntry: ['stepNext'],
                  on: {
                    LOAD_NEXT_STEP: {
                      target: 'Normal',
                      actions: ['loadStep', 'updateStepPosition'],
                    },
                    LEVEL_COMPLETE: {
                      target: 'LevelComplete',
                    },
                  },
                },
                LevelComplete: {
                  onEntry: ['onLevelComplete'],
                  onExit: ['testClear'],
                  on: {
                    NEXT_LEVEL: 'LoadNext',
                    KEY_PRESS_ENTER: 'LoadNext',
                  },
                },
                LoadNext: {
                  id: 'tutorial-load-next',
                  onEntry: ['loadNext'],
                  onExit: ['syncLevelPosition'],
                  on: {
                    NEXT_STEP: {
                      target: 'Load',
                      actions: ['updatePosition'],
                    },
                    NEXT_LEVEL: {
                      target: 'Load',
                      actions: ['updatePosition'],
                    },
                    COMPLETED: {
                      target: '#completed-tutorial',
                      actions: ['onTutorialComplete'],
                    },
                  },
                },
              },
            },
            Reset: {
              id: 'reset-tutorial',
              onEntry: ['runReset'],
              onExit: ['testClear'],
              after: {
                3000: '#tutorial',
              },
            },
            Completed: {
              id: 'completed-tutorial',
              on: {
                SELECT_TUTORIAL: {
                  target: '#select-new-tutorial',
                  actions: ['reset'],
                },
                REQUEST_WORKSPACE: {
                  actions: 'requestWorkspaceSelect',
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
