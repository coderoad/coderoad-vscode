export type ErrorMessageView = 'FULL_PAGE' | 'NOTIFY' | 'NONE'

export type ErrorMessageType = 'UnknownError' | 'GitNotFound' | 'FailedToConnectToGitRepo' | 'GitProjectAlreadyExists'

export type ErrorMessage = {
  type: ErrorMessageType
  message: string
  display?: ErrorMessageView
}
