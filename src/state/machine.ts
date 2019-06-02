import { Machine } from 'xstate'
import * as CR from 'typings'

import actions from './actions'
import guards from './guards'
import initialContext from './context'

// TODO: replace with API

export const tutorialMachine = Machine<
    CR.MachineContext,
    CR.MachineStateSchema,
    CR.MachineEvent
>(
    {
        id: 'tutorial',
        context: initialContext,
        initial: 'Start',
        states: {
            Start: {
                states: {
                    Initial: {
                        onEntry: 'start',
                        on: {
                            CONTINUE: 'ContinueTutorial',
                            NEW: 'NewTutorial',
                        },
                    },
                    NewTutorial: {
                        initial: 'SelectTutorial',
                        states: {
                            SelectTutorial: {
                                on: {
                                    TUTORIAL_START: 'InitializeTutorial',
                                },
                            },
                            InitializeTutorial: {
                                on: {
                                    TUTORIAL_LOADED: 'Tutorial'
                                }
                            },
                        }

                    },
                    ContinueTutorial: {
                        onEntry: 'loadTutorial',
                        on: {
                            TUTORIAL_START: {
                                target: 'Tutorial',
                            }
                        }
                    },
                }
            },
            Tutorial: {
                initial: 'Initialize',
                states: {
                    Initialize: {
                        on: {
                            TUTORIAL_LOADED: [
                                {
                                    target: 'Summary',
                                    cond: 'hasNoProgress',
                                },
                                {
                                    target: 'Level',
                                    cond: 'hasNoLevelProgress',
                                },
                                {
                                    target: 'Stage',
                                },
                            ],
                        },
                    },

                    Summary: {
                        on: {
                            NEXT: 'Level',
                        },
                    },
                    Level: {
                        onEntry: ['loadLevel'],
                        on: {
                            NEXT: 'Stage',
                            BACK: 'Summary',
                        },
                    },
                    Stage: {
                        onEntry: ['loadStage'],
                        initial: 'StageNormal',
                        states: {
                            StageNormal: {
                                on: {
                                    TEST_RUN: 'TestRunning',
                                    STEP_SOLUTION_LOAD: {
                                        actions: ['callSolution'],
                                    },
                                },
                            },
                            TestRunning: {
                                on: {
                                    TEST_SUCCESS: [
                                        {
                                            target: 'StageComplete',
                                            cond: 'tasksComplete',
                                        },
                                        {
                                            target: 'TestPass',
                                        },
                                    ],
                                    TEST_FAILURE: 'TestFail',
                                },
                            },
                            TestPass: {
                                onEntry: ['stepComplete'],
                                on: {
                                    NEXT: [
                                        {
                                            target: 'StageNormal',
                                            cond: 'hasNextStep',
                                        },
                                        {
                                            target: 'StageComplete',
                                        },
                                    ],
                                },
                            },
                            TestFail: {
                                on: {
                                    RETURN: 'StageNormal',
                                },
                            },
                            StageComplete: {
                                on: {
                                    NEXT: [
                                        {
                                            target: 'Stage',
                                            cond: 'hasNextStage',
                                        },
                                        {
                                            target: 'Level',
                                            cond: 'hasNextLevel',
                                        },
                                        {
                                            target: 'EndTutorial',
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    EndTutorial: {},
                }
            }
        }
    },
    {
        actions,
        guards,
        activities: {},
    },
)
