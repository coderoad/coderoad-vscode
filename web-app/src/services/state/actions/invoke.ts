import * as storage from '../storage'
import * as CR from 'typings'
import * as G from 'typings/graphql'

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