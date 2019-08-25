import * as CR from 'typings'
import * as G from 'typings/graphql'
import {TutorialModel} from '../../services/tutorial'
import * as storage from '../../services/storage'
import {gitLoadCommits, gitClear} from '../../services/git'

export default async function loadSolution(dispatch: CR.EditorDispatch, tutorialModel: TutorialModel): Promise<void> {
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

	const step = tutorialModel.step()
	const solution = step.solution

	await gitClear()
	await gitLoadCommits(solution, dispatch)

}
