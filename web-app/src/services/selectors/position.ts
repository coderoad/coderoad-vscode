import {createSelector} from 'reselect'
import * as G from 'typings/graphql'
import * as CR from 'typings'
import * as tutorial from './tutorial'

export const initialPosition = createSelector(
	tutorial.currentVersion,
	(version: G.TutorialVersion) => {
		const position: CR.Position = {
			levelId: version.levels[0].id,
			stageId: version.levels[0].stages[0].id,
			stepId: version.levels[0].stages[0].steps[0].id,
		}
		return position
	}
)
