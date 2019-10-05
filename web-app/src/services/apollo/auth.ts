import {Operation} from 'apollo-boost'

let authToken: string | null = null

export const setAuthToken = (token: string | null) => {
	authToken = token
}

export const authorizeHeaders = (operation: Operation) => {
	operation.setContext({
		headers: {
			token: authToken
		}
	})
}
