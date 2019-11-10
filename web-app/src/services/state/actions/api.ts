import * as CR from 'typings'
import * as G from 'typings/graphql'
import client from '../../apollo'
import authenticateMutation from '../../apollo/mutations/authenticate'
import {setAuthToken} from '../../apollo/auth'
import channel from '../../channel'

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
	authenticate: (async (context: CR.MachineContext): Promise<void> => {

		const result = await client.mutate<AuthenticateData, AuthenticateVariables>({
			mutation: authenticateMutation,
			variables: {
				machineId: context.env.machineId,
				sessionId: context.env.sessionId,
				editor: 'VSCODE',
			}
		}).catch(console.error)

		if (!result || !result.data) {
			// TODO: handle failed authentication
			console.error('ERROR: Authentication failed')
			return
		}
		const {token} = result.data.editorLogin
		// add token to headers
		setAuthToken(token)
		// pass authenticated action back to state machine
		channel.receive({data: {type: 'AUTHENTICATED'}})
	}),
	userTutorialComplete(context: CR.MachineContext) {
		console.log('should update user tutorial as complete')
	}
}