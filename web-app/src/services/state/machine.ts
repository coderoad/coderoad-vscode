import {Machine, MachineOptions} from 'xstate'
import * as CR from 'typings'
import actions from './actions'

const options: MachineOptions<CR.MachineContext, CR.MachineEvent> = {
	// @ts-ignore
	actions
}

export const machine = Machine<CR.MachineContext, CR.MachineStateSchema, CR.MachineEvent>(
	{
		id: 'root',
		initial: 'Start',
		context: {
			tutorial: null,
			position: {levelId: '', stageId: '', stepId: ''},
			progress: {
				levels: {},
				stages: {},
				steps: {},
				complete: false
			}
		},
		states: {
			Start: {
				initial: 'Startup',
				onEntry: ['loadStoredTutorial'],
				states: {
					Startup: {
						on: {
							CONTINUE_TUTORIAL: {
								target: 'ContinueTutorial',
								actions: ['continueTutorial'],
							},
							NEW_TUTORIAL: {
								target: 'SelectTutorial',
							}
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
								target: '#tutorial-stage',
								actions: ['continueConfig'],
							},
							TUTORIAL_SELECT: 'SelectTutorial'
						},
					},
				},
			},
			Tutorial: {
				id: 'tutorial',
				initial: 'Initialize',
				states: {
					// TODO: move Initialize into New Tutorial setup
					Initialize: {
						onEntry: ['initializeTutorial'],
						on: {
							TUTORIAL_CONFIGURED: 'Summary',
							// TUTORIAL_CONFIG_ERROR: 'Start' // TODO: should handle error
						}
					},
					LoadNext: {
						id: 'tutorial-load-next',
						onEntry: ['loadNext'],
						on: {
							NEXT_STEP: {
								target: 'Stage',
								actions: ['updatePosition']
							},
							NEXT_STAGE: {
								target: 'Stage',
								actions: ['updatePosition']
							},
							NEXT_LEVEL: {
								target: 'Level',
								actions: ['updatePosition']
							},
							COMPLETED: '#completed-tutorial'
						}
					},
					Summary: {
						on: {
							LOAD_TUTORIAL: {
								target: 'Level',
								actions: ['initPosition', 'initTutorial']
							}
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
						id: 'tutorial-stage',
						onEntry: ['loadStage', 'loadStep'],
						initial: 'Normal',
						states: {
							Normal: {
								on: {
									TEST_RUN: 'TestRunning',
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
										actions: ['updateStepProgress']
									},
									TEST_FAIL: 'TestFail',
									TEST_ERROR: 'Normal'
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
										actions: ['loadStep']
									},
									STAGE_COMPLETE: {
										target: "StageComplete",
										actions: ['updateStageProgress']
									}
								}
							},
							StageComplete: {
								onEntry: ['syncProgress'],
								on: {
									STAGE_NEXT: '#tutorial-load-next',
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
								actions: ['reset']
							}
						}
					},
				},
			},
		},
	}, options)

export default machine
