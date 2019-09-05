import * as storage from '../storage'
import * as CR from 'typings'

export const newOrContinue = async (context: CR.MachineContext) => {
	const [tutorial, position, progress] = await Promise.all([
		storage.tutorial.get(),
		storage.position.get(),
		storage.progress.get()
	])

	const hasExistingTutorial = (tutorial && tutorial.id && progress && !progress.complete)
	if (hasExistingTutorial) {
		// TODO: calculate position based on progress
		return {
			type: 'CONTINUE',
			payload: {
				tutorial,
				position,
				progress
			}
		}
	}
	// New tutorial
	return Promise.reject()
}