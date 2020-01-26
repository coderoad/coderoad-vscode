import * as CR from 'typings'
import * as G from 'typings/graphql'
import * as Event from 'typings/events'
import { assign, ActionFunctionMap } from 'xstate'
import client from '../../apollo'
import tutorialQuery from '../../apollo/queries/tutorial'
import channel from '../../channel'
import onError from '../../../services/sentry/onError'
import { MachineContext } from './index'
import * as selectors from '../../selectors'

interface TutorialData {
  tutorial: G.Tutorial
}

interface TutorialDataVariables {
  tutorialId: string
  // version: string
}

const actionMap: ActionFunctionMap<MachineContext, Event.SelectTutorialEvents> = {
  loadStoredTutorial(): void {
    // send message to editor to see if there is existing tutorial progress
    // in local storage on the editor
    channel.editorSend({
      type: 'EDITOR_TUTORIAL_LOAD',
    })
  },
  // @ts-ignore
  continueTutorial: assign((context: MachineContext, event: ContinueTutorialEvent) => ({
    ...context,
    tutorial: event.payload.tutorial,
    progress: event.payload.progress,
    position: event.payload.position,
  })),
  // initializeTutorial(context: MachineContext, event: Event.SelectTutorialEvents) {
  //   // setup test runner and git
  //   if (!context.tutorial) {
  //     const error = new Error('Tutorial not available to load')
  //     onError(error)
  //     throw error
  //   }

  //   client
  //     .query<TutorialData, TutorialDataVariables>({
  //       query: tutorialQuery,
  //       variables: {
  //         tutorialId: context.tutorial.id,
  //         // version: context.tutorial.version.version, // TODO: reimplement version
  //       },
  //     })
  //     .then(result => {
  //       if (!result || !result.data || !result.data.tutorial) {
  //         const message = 'No tutorial returned from tutorial config query'
  //         onError(new Error(message))
  //         return Promise.reject(message)
  //       }

  //       channel.editorSend({
  //         type: 'EDITOR_TUTORIAL_CONFIG',
  //         payload: { tutorial: result.data.tutorial },
  //       })
  //     })
  //     .catch((error: Error) => {
  //       const message = `Failed to load tutorial config ${error.message}`
  //       onError(new Error(message))
  //       return Promise.reject(message)
  //     })
  // },
  // continueConfig(context: CR.MachineContext) {
  //   channel.editorSend({
  //     type: 'EDITOR_TUTORIAL_CONTINUE_CONFIG',
  //     payload: {
  //       // pass position because current stepId or first stepId will be empty
  //       stepId: context.position.stepId,
  //     },
  //   })
  // },
  // initPositionAndProgress: assign((context: MachineContext, event: Event.LoadTutorialEvent) => ({
  //   position: selectors.initialPosition(event.payload),
  //   progress: selectors.defaultProgress(),
  // })),
  clearStorage(): void {
    channel.editorSend({ type: 'TUTORIAL_CLEAR' })
  },
  userTutorialComplete(context: MachineContext) {
    console.log('should update user tutorial as complete')
  },
}

export default actionMap
