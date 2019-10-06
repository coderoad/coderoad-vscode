import * as CR from 'typings'
import client from '../../apollo'
import authenticateMutation from '../../apollo/mutations/authenticate'
import {setAuthToken} from '../../apollo/auth'
import channel from '../../../services/channel'

export default {
	authenticate: (async (context: CR.MachineContext): Promise<void> => {

		const result = await client.mutate({
			mutation: authenticateMutation,
			variables: {
				machineId: context.env.machineId,
				sessionId: context.env.sessionId,
				editor: 'VSCODE',
			}
		})


		if (!result || !result.data) {
			// TODO: handle failed authentication
			console.error('ERROR: Authentication failed')
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