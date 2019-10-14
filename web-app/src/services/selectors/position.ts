import {createSelector} from 'reselect'
import * as G from 'typings/graphql'
import * as CR from 'typings'
import * as tutorial from './tutorial'

export const defaultPosition = () => ({
	levelId: '',
	stepId: ''
})

export const initialPosition = createSelector(
	tutorial.currentVersion,
	(version: G.TutorialVersion) => {
		const position: CR.Position = {
			levelId: version.data.levels[0].id,
			stepId: version.data.levels[0].steps[0].id,
		}
		return position
	}
)
