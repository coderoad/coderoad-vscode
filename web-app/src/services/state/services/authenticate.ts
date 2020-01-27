import * as CR from 'typings'
import * as G from 'typings/graphql'
import client from '../../apollo'
import { setAuthToken } from '../../apollo/auth'
import authenticateMutation from '../../apollo/mutations/authenticate'
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

export async function authenticate(context: CR.MachineContext): Promise<any> {
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
      // let message
      if (error.message.match(/Network error:/)) {
        throw {
          error: {
            title: 'Network Error',
            description: 'Make sure you have an Internet connection. Restart and try again',
          },
        }
      } else {
        throw {
          error: {
            title: 'Server Error',
            description: error.message,
          },
        }
      }
    })

  if (!result || !result.data) {
    const error = new Error('Authentication request responded with no data')
    console.log(error)
    onError(error)
    return
  }
  const { token } = result.data.editorLogin
  console.log(`Token: ${token}`)
  // add token to headers
  setAuthToken(token)
  // pass authenticated action back to state machine
  return
}
