export type ErrorMessageView = 'FULL_PAGE' | 'NOTIFY' | 'NONE'

export type ErrorMessageType =
  | 'FailedToConnectToGitRepo'
  | 'GitNotFound'
  | 'GitConfigError'
  | 'GitUserNotConfigured'
  | 'GitProjectAlreadyExists'
  | 'GitRemoteAlreadyExists'
  | 'MissingTutorialDependency'
  | 'NoWorkspaceFound'
  | 'UnknownError'
  | 'UnmetExtensionVersion'
  | 'UnmetTutorialDependency'
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
