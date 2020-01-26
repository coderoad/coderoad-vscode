import * as CR from 'typings'
import * as G from 'typings/graphql'
import { AuthenticateEvents, EventLoadEvent, ErrorMessageEvent } from 'typings/events'
import { assign, ActionFunctionMap } from 'xstate'
import client from '../../apollo'
import { setAuthToken } from '../../apollo/auth'
import authenticateMutation from '../../apollo/mutations/authenticate'
import channel from '../../channel'
import onError from '../../../services/sentry/onError'
import { MachineContext } from './index'

interface AuthenticateData {
  editorLogin: {
    token: string
    user: G.User
  }
}

interface AuthenticateVariables {
  machineId: string
  sessionId: string
  editor: 'VSCODE'
}

const actions: ActionFunctionMap<MachineContext, AuthenticateEvents> = {
  loadEnv(): void {
    channel.editorSend({
      type: 'ENV_GET',
    })
  },
  // @ts-ignore
  setEnv: assign({
    env: (context: MachineContext, event: EventLoadEvent): CR.Environment => ({
      ...context.env,
      ...event.payload.env,
    }),
  }),
  authenticate: async (context: MachineContext): Promise<void> => {
    const result = await client
      .mutate<AuthenticateData, AuthenticateVariables>({
        mutation: authenticateMutation,
        variables: {
          machineId: context.env.machineId,
          sessionId: context.env.sessionId,
          editor: 'VSCODE',
        },
      })
      .catch(error => {
        onError(error)
        console.log('ERROR: Authentication failed')
        console.log(error.message)
        let message
        if (error.message.match(/Network error:/)) {
          message = {
            title: 'Network Error',
            description: 'Make sure you have an Internet connection. Restart and try again',
          }
        } else {
          message = {
            title: 'Server Error',
            description: error.message,
          }
        }
        // TODO: fix
        // channel.receive({ data: { payload: message } })
        return
      })

    if (!result || !result.data) {
      const error = new Error('Authentication request responded with no data')
      console.log(error)
      onError(error)
      return
    }
    const { token } = result.data.editorLogin
    // add token to headers
    setAuthToken(token)
    // pass authenticated action back to state machine
    channel.receive({ data: { type: 'AUTHENTICATED' } })
  },
}

export default actions
