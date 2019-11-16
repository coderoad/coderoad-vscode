import { Operation } from 'apollo-boost'

let authToken: string | null = null

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
