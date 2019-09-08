import {Machine, MachineOptions} from 'xstate'
import * as CR from 'typings'
import actions from './actions'
import * as invoke from './actions/invoke'

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
				states: {
					Startup: {
						invoke: {
							id: 'newOrContinue',
							src: invoke.newOrContinue,
							onDone: {
								target: 'ContinueTutorial',
								actions: ['continueTutorial']
							},
							onError: 'SelectTutorial'
						},
					},
					SelectTutorial: {
						id: 'start-new-tutorial',
						on: {
							TUTORIAL_START: {
								target: '#tutorial',
								actions: ['setTutorial'],
							},
						},
					},
					ContinueTutorial: {
						on: {
							TUTORIAL_START: '#tutorial',
						},
					},
				},
			},
			Tutorial: {
				id: 'tutorial',
				initial: 'Initialize',
				states: {
					Initialize: {
						onEntry: ['initializeTutorial'],
						after: {
							0: 'Summary',
						},
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
								actions: ['tutorialConfig', 'initPosition', 'setTutorial']
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
									TEST_PASS: {
										target: 'TestPass',
										// TODO: combine updateStepProgress & updateStepPosition
										actions: ['updateStepProgress']
									},
									TEST_FAIL: 'TestFail',
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
								on: {
									STAGE_NEXT: '#tutorial-load-next',
								},
							},
						},
					},
					Completed: {
						id: 'completed-tutorial',
						onEntry: ['userTutorialComplete'],
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
