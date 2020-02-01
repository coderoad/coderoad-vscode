import * as CR from 'typings'
import * as G from 'typings/graphql'
import client from '../../apollo'
import summaryQuery from '../../apollo/queries/summary'
import onError from '../../../services/sentry/onError'

interface TutorialData {
  tutorial: G.Tutorial
}

interface TutorialDataVariables {
  tutorialId: string
  // version: string
}

export async function loadTutorialSummary(context: CR.MachineContext): Promise<any> {
  // setup test runner and git
  if (!context.tutorial) {
    const error = new Error('Tutorial not available to load')
    onError(error)
    throw error
  }

  try {
    const result = await client.query<TutorialData, TutorialDataVariables>({
      query: summaryQuery,
      variables: {
        tutorialId: context.tutorial.id,
        // version: context.tutorial.version.version, // TODO: reimplement version
      },
    })
    if (!result || !result.data || !result.data.tutorial) {
      const message = 'No tutorial returned from tutorial config query'
      onError(new Error(message))
      return Promise.reject(message)
    }
    return Promise.resolve(result.data.tutorial)
  } catch (error) {
    const message: CR.ErrorMessage = { title: 'Failed to load tutorial config', description: error.message }
    onError(error)
    return Promise.reject(message)
  }
}
