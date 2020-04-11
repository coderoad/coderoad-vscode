export type ErrorMessageView = 'FULL_PAGE' | 'NOTIFY' | 'NONE'

export type ErrorMessageType =
  | 'UnknownError'
  | 'GitNotFound'
  | 'FailedToConnectToGitRepo'
  | 'GitProjectAlreadyExists'
  | 'GitRemoteAlreadyExists'
  | 'WorkspaceNotEmpty'

export type ErrorAction = {
  label: string
  transition: string
}

export type ErrorMessage = {
  type: ErrorMessageType
  message: string
  display?: ErrorMessageView
  actions?: ErrorAction[]
}
