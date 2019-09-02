import {Machine} from 'xstate'
import * as CR from 'typings'
import {TutorialModel} from '../services/tutorial'

import createActions from './actions'
import createGuards from './guards'

export const machine = (tutorialModel: TutorialModel, editorDispatch: CR.EditorDispatch) =>
	Machine<{}, CR.MachineStateSchema, CR.MachineEvent>(
		{
			id: 'root',
			initial: 'Start',
			states: {
				Start: {
					onEntry: ['createWebview'],
					initial: 'Initial',
					states: {
						Initial: {
							on: {
								WEBVIEW_INITIALIZED: 'Startup',
							},
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
					on: {
						WEBVIEW_INITIALIZED: '#tutorial-load-next'
					},
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
							onEntry: ['loadStage', 'stepLoadCommits'],
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
									onEntry: ['testPass', 'progressUpdate'],
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
			actions: createActions(tutorialModel, editorDispatch),
			guards: createGuards(tutorialModel),
			activities: {},
		},
	)

export default machine
