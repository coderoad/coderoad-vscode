import {Machine} from 'xstate'
import * as CR from 'typings'

import actions from './actions'
import guards from './guards'

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
									TUTORIAL_START: {
										target: 'InitializeTutorial',
										actions: ['setTutorial'],
									},
								},
							},
							InitializeTutorial: {
								onEntry: ['tutorialStart'],
								on: {
									TUTORIAL_LOADED: '#tutorial',
								},
							},
						},
					},
					ContinueTutorial: {
						onEntry: ['tutorialContinue'],
						on: {
							TUTORIAL_START: '#tutorial-load-next',
						},
					},
				},
			},
			Tutorial: {
				id: 'tutorial',
				initial: 'Initialize',
				onEntry: ['testRunnerSetup'],
				states: {
					Initialize: {
						onEntry: ['initializeNewTutorial'],
						after: {
							0: 'Summary',
						},
					},
					LoadNext: {
						id: 'tutorial-load-next',
						after: {
							0: [{
								target: 'Stage',
								cond: 'hasNextStep',
							},
							{
								target: 'Stage',
								cond: 'hasNextStage',
							},
							{
								target: 'Level',
								cond: 'hasNextLevel',
							},
							{
								target: '#completed-tutorial',
							},
							],
						},
					},

					Summary: {
						on: {
							LOAD_TUTORIAL: {
								target: 'Level',
								actions: ['initPosition', 'setTutorial']
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
						onEntry: ['loadStage', 'stepLoadCommits'],
						initial: 'Normal',
						states: {
							Normal: {
								on: {
									TEST_RUN: {
										target: 'TestRunning',
										actions: 'testStart',
									},
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
										actions: ['updateStepProgress']
									},
									TEST_FAIL: 'TestFail',
								},
							},
							TestPass: {
								onExit: ['stepLoadNext'],
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
								after: {
									0: [
										{
											target: 'Normal',
											cond: 'hasNextStep',
											actions: ['stepLoadCommits'],
										},
										{
											target: 'StageComplete',
											actions: ['updateStageProgress']
										},
									],
								},
							},
							StageComplete: {
								on: {
									STAGE_NEXT: {
										target: '#tutorial-load-next',
										actions: ['updatePosition'],
									},
								},
							},
						},
					},
					Completed: {
						id: 'completed-tutorial',
						type: 'final',
					},
				},
			},
		},
	},
	{
		actions,
		guards,
		activities: {},
	},
)

export default machine
