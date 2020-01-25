import * as CR from 'typings'
import * as G from 'typings/graphql'
import { assign, send } from 'xstate'
import * as selectors from '../../../selectors'
import onError from '../../../sentry/onError'

export default {
  setEnv: assign({
    env: (context: CR.MachineContext, event: CR.MachineEvent) => {
      return {
        ...context.env,
        ...event.payload.env,
      }
    },
  }),
  continueTutorial: assign({
    tutorial: (context: CR.MachineContext, event: CR.MachineEvent) => {
      return event.payload.tutorial
    },
    progress: (context: CR.MachineContext, event: CR.MachineEvent) => {
      return event.payload.progress
    },
    position: (context: CR.MachineContext, event: CR.MachineEvent) => {
      return event.payload.position
    },
  }),
  newTutorial: assign({
    tutorial: (context: CR.MachineContext, event: CR.MachineEvent): any => {
      return event.payload.tutorial
    },
    progress: (): CR.Progress => {
      return { levels: {}, steps: {}, complete: false }
    },
  }),
  initTutorial: assign({
    // loads complete tutorial
    tutorial: (context: CR.PlayMachineContext, event: CR.MachineEvent): any => {
      return event.payload.tutorial
    },
  }),
  // @ts-ignore
  setError: assign({
    error: (context: CR.MachineContext, event: CR.MachineEvent): string | null => {
      return event.payload.error
    },
  }),
}
