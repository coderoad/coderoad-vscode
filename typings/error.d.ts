export type ErrorMessageView = 'FULL_PAGE' | 'NOTIFY' | 'NONE'

export type ErrorMessageType =
  | 'UnknownError'
  | 'NoWorkspaceFound'
  | 'GitNotFound'
  | 'WorkspaceNotEmpty'
  | 'FailedToConnectToGitRepo'
  | 'GitProjectAlreadyExists'
  | 'GitRemoteAlreadyExists'

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
