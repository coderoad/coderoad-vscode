import * as G from 'typings/graphql'
import * as CR from 'typings'
import * as selectors from '../../selectors'
import channel from '../../channel'
import client from '../../apollo'
import tutorialQuery from '../../apollo/queries/tutorial'

export default {
	loadStoredTutorial() {
		// send message to editor to see if there is existing tutorial progress
		// in local storage on the editor
		channel.editorSend({
			type: 'EDITOR_TUTORIAL_LOAD',
		})
	},
	// TODO: syncProgress unused
	syncProgress(context: CR.MachineContext) {
		// sync progress in editor local storage for persistence
		channel.editorSend({
			type: 'EDITOR_SYNC_PROGRESS',
			payload: {
				progress: context.progress,
			}
		})
	},
	initializeTutorial(context: CR.MachineContext, event: CR.MachineEvent) {
		// setup test runner and git
		if (!context.tutorial) {
			throw new Error('Tutorial not available to load')
		}

		client.query({
			query: tutorialQuery,
			variables: {
				tutorialId: context.tutorial.id,
				version: context.tutorial.version.version,
			}
		}).then((result) => {
			if (!result || !result.data || !result.data.tutorial) {
				return Promise.reject('No tutorial returned from tutorial config query')
			}

			channel.editorSend({
				type: 'EDITOR_TUTORIAL_CONFIG',
				payload: {tutorial: result.data.tutorial},
			})
		})
			.catch((error: Error) => {
				return Promise.reject(`Failed to load tutorial config ${error.message}`)
			})
	},
	continueConfig() {
		channel.editorSend({
			type: 'EDITOR_TUTORIAL_CONTINUE_CONFIG',
		})
	},
	loadLevel(context: CR.MachineContext): void {
		const level: G.Level = selectors.currentLevel(context)
		if (level.setup) {
			// load step actions
			channel.editorSend({
				type: 'SETUP_ACTIONS',
				payload: level.setup,
			})
		}
	},
	loadStage(context: CR.MachineContext): void {
		const stage: G.Stage = selectors.currentStage(context)
		if (stage.setup) {
			// load step actions	
			channel.editorSend({
				type: 'SETUP_ACTIONS',
				payload: stage.setup,
			})
		}
	},
	loadStep(context: CR.MachineContext): void {
		const step: G.Step = selectors.currentStep(context)
		if (step.setup) {
			// load step actions
			channel.editorSend({
				type: 'SETUP_ACTIONS',
				payload: {
					stepId: step.id,
					...step.setup,
				}
			})
		}
	},
	editorLoadSolution(context: CR.MachineContext): void {
		const step: G.Step = selectors.currentStep(context)
		// tell editor to load solution commit
		channel.editorSend({
			type: 'SOLUTION_ACTIONS',
			payload: {
				stepId: step.id,
				...step.solution,
			}
		})
	},
	clearStorage(): void {
		channel.editorSend({type: 'TUTORIAL_CLEAR'})
	}
}