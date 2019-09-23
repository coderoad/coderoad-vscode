import * as CR from 'typings'
import client from '../../apollo'
import tutorialQuery from '../../apollo/queries/tutorial'

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