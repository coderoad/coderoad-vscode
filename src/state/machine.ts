import { Machine, send } from 'xstate'
import * as CR from 'typings'

import actions from './actions'
import guards from './guards'
import initialContext from './context'

export const machine = Machine<
    CR.MachineContext,
    CR.MachineStateSchema,
    CR.MachineEvent
>(
    {
        id: 'tutorial',
        context: initialContext,
        initial: 'SelectTutorial',
        states: {
            SelectTutorial: {
                onEntry: ['createWebview'],
                initial: 'Initial',
                states: {
                    Initial: {
                        after: {
                            1000: 'Startup'
                        }
                    },
                    Startup: {
                        onEntry: ['newOrContinue'],
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
                                onEntry: ['tutorialLaunch'],
                                on: {
                                    TUTORIAL_LOADED: 'Tutorial'
                                }
                            },
                        }

                    },
                    ContinueTutorial: {
                        onEntry: ['tutorialContinue'],
                        on: {
                            TUTORIAL_START: {
                                target: 'Tutorial.LoadNext',
                            }
                        }
                    },
                }
            },
            Tutorial: {
                initial: 'Summary',
                states: {
                    LoadNext: {
                        onEntry: () => send('LOAD_NEXT'),
                        on: {
                            LOAD_NEXT: [
                                {
                                    target: 'Level',
                                    cond: 'hasNoNextLevelProgress',
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

export default machine