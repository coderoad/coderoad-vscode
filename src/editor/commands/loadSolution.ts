import * as CR from 'typings'
import * as G from 'typings/graphql'
import {TutorialModel} from '../../services/tutorial'
import {gitLoadCommits, gitClear} from '../../services/git'

export default async function loadSolution(dispatch: CR.EditorDispatch, tutorialModel: TutorialModel): Promise<void> {
	const step: G.Step = tutorialModel.step()
	const solution = step.solution

	await gitClear()
	await gitLoadCommits(solution, dispatch)

}
