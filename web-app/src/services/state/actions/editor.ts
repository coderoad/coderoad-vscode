import * as CR from 'typings'
import * as G from 'typings/graphql'
import client from '../../apollo'
import tutorialQuery from '../../apollo/queries/tutorial'
import channel from '../../channel'
import * as selectors from '../../selectors'
import onError from 'services/sentry/onError'

interface TutorialData {
  tutorial: G.Tutorial
}

interface TutorialDataVariables {
  tutorialId: string
  // version: string
}

export default {
  loadEnv(): void {
    channel.editorSend({
      type: 'ENV_GET',
    })
  },
  loadStoredTutorial(): void {
    // send message to editor to see if there is existing tutorial progress
    // in local storage on the editor
    channel.editorSend({
      type: 'EDITOR_TUTORIAL_LOAD',
    })
  },
  initializeTutorial(context: CR.MachineContext, event: CR.MachineEvent) {
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
  continueConfig(context: CR.MachineContext) {
    channel.editorSend({
      type: 'EDITOR_TUTORIAL_CONTINUE_CONFIG',
      payload: {
        // pass position because current stepId or first stepId will be empty
        stepId: context.position.stepId,
      },
    })
  },
  loadLevel(context: CR.MachineContext): void {
    const level: G.Level = selectors.currentLevel(context)
    if (level.setup) {
      // load step actions
      channel.editorSend({
        type: 'SETUP_ACTIONS',
        payload: level.setup,
      })
    }
  },
  loadStep(context: CR.MachineContext): void {
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
  editorLoadSolution(context: CR.MachineContext): void {
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
