import * as CR from 'typings'
import client from '../../apollo'
import authenticateMutation from '../../apollo/mutations/authenticate'
import {setAuthToken} from '../../apollo/auth'
import {send} from 'xstate'

export default {
	authenticate: (async (context: CR.MachineContext): Promise<CR.Action> => {
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
			console.log('unauthenticated')
		}
		const {token} = result.data.editorLogin
		console.log(token)
		setAuthToken(token)
		return send({type: 'AUTHENTICATED'})
	}),
	userTutorialComplete(context: CR.MachineContext) {
		console.log('should update user tutorial as complete')
	}
}