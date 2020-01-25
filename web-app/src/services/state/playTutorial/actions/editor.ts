import * as CR from 'typings'
import * as G from 'typings/graphql'
import client from '../../../apollo'
import tutorialQuery from '../../../apollo/queries/tutorial'
import channel from '../../../channel'
import * as selectors from '../../../selectors'
import onError from '../../../sentry/onError'

interface TutorialData {
  tutorial: G.Tutorial
}

interface TutorialDataVariables {
  tutorialId: string
  // version: string
}

export default {
  configureTutorial(context: CR.PlayMachineContext, event: CR.MachineEvent) {
    // setup test runner and git
    if (!context.tutorial) {
      const error = new Error('Tutorial not available to load')
      onError(error)
      throw error
    }

    client
      .query<TutorialData, TutorialDataVariables>({
        query: tutorialQuery,
        variables: {
          tutorialId: context.tutorial.id,
          // version: context.tutorial.version.version, // TODO: reimplement version
        },
      })
      .then(result => {
        if (!result || !result.data || !result.data.tutorial) {
          const message = 'No tutorial returned from tutorial config query'
          onError(new Error(message))
          return Promise.reject(message)
        }

        channel.editorSend({
          type: 'EDITOR_TUTORIAL_CONFIG',
          payload: { tutorial: result.data.tutorial },
        })
      })
      .catch((error: Error) => {
        const message = `Failed to load tutorial config ${error.message}`
        onError(new Error(message))
        return Promise.reject(message)
      })
  },
  loadLevel(context: CR.PlayMachineContext): void {
    const level: G.Level = selectors.currentLevel(context)
    if (level.setup) {
      // load step actions
      channel.editorSend({
        type: 'SETUP_ACTIONS',
        payload: level.setup,
      })
    }
  },
  loadStep(context: CR.PlayMachineContext): void {
    const step: G.Step = selectors.currentStep(context)
    if (step.setup) {
      // load step actions
      channel.editorSend({
        type: 'SETUP_ACTIONS',
        payload: {
          stepId: step.id,
          ...step.setup,
        },
      })
    }
  },
  editorLoadSolution(context: CR.PlayMachineContext): void {
    const step: G.Step = selectors.currentStep(context)
    // tell editor to load solution commit
    channel.editorSend({
      type: 'SOLUTION_ACTIONS',
      payload: {
        stepId: step.id,
        ...step.solution,
      },
    })
  },
  clearStorage(): void {
    channel.editorSend({ type: 'TUTORIAL_CLEAR' })
  },
}
