import * as CR from 'typings'
import * as G from 'typings/graphql'
import * as storage from '../../services/storage'
import {gitLoadCommits, gitClear} from '../../services/git'

export default async function loadSolution(dispatch: CR.EditorDispatch): Promise<void> {
	const [position, tutorial]: [CR.Position, G.Tutorial | undefined] = await Promise.all([
		storage.getPosition(),
		storage.getTutorial(),
	])
	if (!position) {
		throw new Error('No tutorial position state found')
	}
	if (!tutorial || !tutorial.version || !tutorial.version.levels) {
		throw new Error('Local tutorial not found')
	}
	// eslint-disable-next-line

	try {
		const solution = tutorial.version
			.levels.find((l: G.Level) => l.id === position.levelId)
			.stages.find((s: G.Stage) => s.id === position.stageId)
			.steps.find((s: G.Step) => s.id === position.stepId)
			.solution

		await gitClear()
		await gitLoadCommits(solution, dispatch)
	} catch (error) {
		throw new Error(error)
	}

}
