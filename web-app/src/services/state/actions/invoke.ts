import * as storage from '../storage'
import * as CR from 'typings'
import * as G from 'typings/graphql'
import client from '../../apollo'
import tutorialQuery from '../../apollo/queries/tutorial'

export const newOrContinue = async (context: CR.MachineContext) => {
	const [tutorial, progress] = await Promise.all([
		storage.tutorial.get(),
		storage.progress.get()
	])

	const hasExistingTutorial: boolean = (!!tutorial && !!progress && !progress.complete && !!tutorial.id)

	if (!hasExistingTutorial) {
		return Promise.reject()
	}

	// Calculate position based on progress

	// @ts-ignore
	const level = tutorial.version.levels.find((l: G.Level) => !progress.levels[l.id])
	if (!level) {
		// tutorial complete
		return Promise.reject()
	}

	// @ts-ignore
	const stage = level.stages.find((s: G.Stage) => !progress.stages[s.id])
	if (!stage) {
		// something went wrong
		return Promise.reject()
	}

	// @ts-ignore
	const step = stage.steps.find((s: G.Step) => !progress.steps[s.id])
	if (!step) {
		return Promise.reject()
	}

	const position = {
		levelId: level.id,
		stageId: stage.id,
		stepId: step.id,
	}

	return {
		type: 'CONTINUE',
		payload: {
			tutorial,
			position,
			progress
		}
	}
}

export const loadTutorial = async (context: CR.MachineContext) => {
	if (!context.tutorial) {
		throw new Error('Tutorial not available to load')
	}

	const result = await client.query({
		query: tutorialQuery,
		variables: {
			tutorialId: context.tutorial.id,
			version: context.tutorial.version.version,
		}
	})
		.catch((error: Error) => {
			return Promise.reject(`Failed to load tutorial config ${error.message}`)
		})
	if (!result || !result.data) {
		return Promise.reject('No tutorial returned from tutorial config query')
	}

	const {data} = result
	return {
		type: 'TUTORIAL_LOADED',
		payload: data
	}
}