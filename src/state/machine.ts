import { Machine } from 'xstate'
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
        id: 'root',
        context: initialContext,
        initial: 'SelectTutorial',
        states: {
            SelectTutorial: {
                onEntry: ['createWebview'],
                initial: 'Initial',
                states: {
                    Initial: {
                        on: {
                            WEBVIEW_INITIALIZED: 'Startup'
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
                                    TUTORIAL_LOADED: '#tutorial'
                                }
                            },
                        }
                    },
                    ContinueTutorial: {
                        onEntry: ['tutorialContinue'],
                        on: {
                            TUTORIAL_START: '#tutorial-load-current'
                        }
                    },
                }
            },
            Tutorial: {
                id: 'tutorial',
                initial: 'Initialize',
                onEntry: ['tutorialSetup'],
                states: {
                    Initialize: {
                        onEntry: ['initializeNewTutorial'],
                        after: {
                            0: 'Summary'
                        }
                    },
                    LoadCurrent: {
                        id: 'tutorial-load-current',
                        // TODO: verify current is not complete
                        after: {
                            0: 'Stage'
                        },
                    },
                    LoadNext: {
                        id: 'tutorial-load-next',
                        after: {
                            0: [
                                {
                                    target: 'Stage',
                                    cond: 'hasNextStage',
                                },
                                {
                                    target: 'Level',
                                    cond: 'hasNextLevel'
                                },
                                {
                                    target: '#end-tutorial'
                                }
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
                        initial: 'Normal',
                        states: {
                            Normal: {
                                on: {
                                    TEST_RUN: 'TestRunning',
                                    STEP_SOLUTION_LOAD: {
                                        actions: ['callSolution'],
                                    },
                                },
                            },
                            TestRunning: {
                                onEntry: ['testStart'],
                                on: {
                                    TEST_PASS: 'TestPass',
                                    TEST_FAIL: 'TestFail',
                                },
                            },
                            TestPass: {
                                onEntry: ['testPass', 'stepComplete'],
                                onExit: ['stepLoadNext'],
                                after: {
                                    1000: 'StepNext',
                                },

                            },
                            TestFail: {
                                onEntry: ['testFail'],
                                after: {
                                    0: 'Normal'
                                },
                            },
                            StepNext: {
                                after: {
                                    0: [{
                                        target: 'Normal',
                                        cond: 'hasNextStep',
                                        actions: ['stepLoadCommits']
                                    }, {
                                        target: 'StageComplete'
                                    }]
                                },
                            },
                            StageComplete: {
                                onEntry: 'stageComplete',
                                on: {
                                    STAGE_NEXT: '#tutorial-load-next',
                                },
                            },
                        },
                    },
                    EndTutorial: {
                        id: 'end-tutorial',
                        type: 'final'
                    },
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