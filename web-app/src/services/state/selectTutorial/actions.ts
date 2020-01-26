import * as G from 'typings/graphql'
import { ActionFunctionMap } from 'xstate'
import client from '../../apollo'
import tutorialQuery from '../../apollo/queries/tutorial'
import channel from '../../channel'
import onError from '../../../services/sentry/onError'
import { MachineContext, MachineEvent } from './index'

interface TutorialData {
  tutorial: G.Tutorial
}

interface TutorialDataVariables {
  tutorialId: string
  // version: string
}

const actionMap: ActionFunctionMap<MachineContext, MachineEvent> = {
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
  initializeTutorial(context: MachineContext, event: MachineEvent) {
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
  // continueConfig(context: CR.MachineContext) {
  //   channel.editorSend({
  //     type: 'EDITOR_TUTORIAL_CONTINUE_CONFIG',
  //     payload: {
  //       // pass position because current stepId or first stepId will be empty
  //       stepId: context.position.stepId,
  //     },
  //   })
  // },
  clearStorage(): void {
    channel.editorSend({ type: 'TUTORIAL_CLEAR' })
  },
  userTutorialComplete(context: MachineContext) {
    console.log('should update user tutorial as complete')
  },
}

export default actionMap
