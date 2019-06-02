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
        initial: 'initial',
        states: {
            initial: {
                on: {
                    START: [
                        {
                            target: 'continue',
                            cond: 'hasExistingTutorial',
                        },
                        {
                            target: 'new',
                        },
                    ],
                },
            },
            new: {
                on: {
                    TUTORIAL_START: 'loading',
                },
            },
            continue: {
                on: {
                    TUTORIAL_START: 'loading',
                },
            },
            loading: {
                on: {
                    TUTORIAL_LOADED: [
                        {
                            target: 'summary',
                            cond: 'hasNoProgress',
                        },
                        {
                            target: 'level',
                            cond: 'hasNoLevelProgress',
                        },
                        {
                            target: 'stage',
                        },
                    ],
                },
            },
            summary: {
                on: {
                    NEXT: 'level',
                },
            },
            level: {
                onEntry: ['loadLevel'],
                on: {
                    NEXT: 'stage',
                    BACK: 'summary',
                },
            },
            stage: {
                onEntry: ['loadStage'],
                initial: 'stageNormal',
                states: {
                    stageNormal: {
                        on: {
                            TEST_RUN: 'testRunning',
                            STEP_SOLUTION_LOAD: {
                                actions: ['callSolution'],
                            },
                        },
                    },
                    testRunning: {
                        on: {
                            TEST_SUCCESS: [
                                {
                                    target: 'complete',
                                    cond: 'tasksComplete',
                                },
                                {
                                    target: 'testPass',
                                },
                            ],
                            TEST_FAILURE: 'testFail',
                        },
                    },
                    testPass: {
                        onEntry: ['stepComplete'],
                        on: {
                            NEXT: [
                                {
                                    target: 'stageNormal',
                                    cond: 'hasNextStep',
                                },
                                {
                                    target: 'stageComplete',
                                },
                            ],
                        },
                    },
                    testFail: {
                        on: {
                            RETURN: 'stageNormal',
                        },
                    },
                    stageComplete: {
                        on: {
                            NEXT: [
                                {
                                    target: 'stage',
                                    cond: 'hasNextStage',
                                },
                                {
                                    target: 'level',
                                    cond: 'hasNextLevel',
                                },
                                {
                                    target: 'complete',
                                },
                            ],
                        },
                    },
                },
            },
            complete: {},
        },
    },
    {
        actions,
        guards,
        activities: {},
    },
)
