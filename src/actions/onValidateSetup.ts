import * as E from 'typings/error'
import { version } from '../services/dependencies'
import { checkWorkspaceEmpty } from '../services/workspace'
import { send } from '../commands'
import { validateGitConfig } from '../services/git'

const onValidateSetup = async (): Promise<void> => {
  try {
    // check workspace is selected
    const isEmptyWorkspace = await checkWorkspaceEmpty()
    if (!isEmptyWorkspace) {
      const error: E.ErrorMessage = {
        type: 'WorkspaceNotEmpty',
        message: '',
        actions: [
          {
            label: 'Open Workspace',
            transition: 'REQUEST_WORKSPACE',
          },
          {
            label: 'Check Again',
            transition: 'RETRY',
          },
        ],
      }
      send({ type: 'VALIDATE_SETUP_FAILED', payload: { error } })
      return
    }
    // check Git is installed.
    // Should wait for workspace before running otherwise requires access to root folder
    const isGitInstalled = await version('git')
    if (!isGitInstalled) {
      const error: E.ErrorMessage = {
        type: 'GitNotFound',
        message: '',
        actions: [
          {
            label: 'Check Again',
            transition: 'RETRY',
          },
        ],
      }
      send({ type: 'VALIDATE_SETUP_FAILED', payload: { error } })
      return
    }

    const isGitUserNameConfigured = await validateGitConfig('user.name')
    const isGitUserEmailConfigured = await validateGitConfig('user.email')
    if (!isGitUserNameConfigured || !isGitUserEmailConfigured) {
      let message = ''
      if (!isGitUserNameConfigured) message += 'Git user not configured.\n'
      if (!isGitUserEmailConfigured) message += 'Git email not configured.'
      const error: E.ErrorMessage = {
        type: 'GitUserNotConfigured',
        message,
        actions: [
          {
            label: 'Check Again',
            transition: 'RETRY',
          },
        ],
      }
      send({ type: 'VALIDATE_SETUP_FAILED', payload: { error } })
      return
    }

    send({ type: 'SETUP_VALIDATED' })
  } catch (e) {
    const error = {
      type: 'UknownError',
      message: e.message,
    }
    send({ type: 'VALIDATE_SETUP_FAILED', payload: { error } })
  }
}

export default onValidateSetup
