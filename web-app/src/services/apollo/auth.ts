import { Operation } from 'apollo-boost'
import { AUTH_TOKEN } from '../../environment'

let authToken: string | null = AUTH_TOKEN || null

export const setAuthToken = (token: string | null) => {
  authToken = token
}

export const authorizeHeaders = (operation: Operation) => {
  if (authToken) {
    operation.setContext({
      headers: {
        Authorization: authToken,
      },
    })
  }
}
