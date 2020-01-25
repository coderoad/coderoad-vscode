import * as CR from 'typings'
import * as G from 'typings/graphql'
import client from '../../apollo'
import { setAuthToken } from '../../apollo/auth'
import authenticateMutation from '../../apollo/mutations/authenticate'
import channel from '../../channel'
import onError from '../../../services/sentry/onError'

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

export default {
  authenticate: async (context: CR.MachineContext): Promise<void> => {
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
        channel.receive({ data: { type: 'ERROR', payload: { error: message } } })
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
  userTutorialComplete(context: CR.MachineContext) {
    console.log('should update user tutorial as complete')
  },
}
