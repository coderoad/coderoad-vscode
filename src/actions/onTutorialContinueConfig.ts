import * as vscode from 'vscode'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import Context from '../services/context/context'
import tutorialConfig from './utils/tutorialConfig'
import { COMMANDS } from '../commands'

const onTutorialContinueConfig = async (action: T.Action, context: Context, send: any) => {
  try {
    const tutorialContinue: TT.Tutorial | null = context.tutorial.get()
    if (!tutorialContinue) {
      throw new Error('Invalid tutorial to continue')
    }
    await tutorialConfig({
      data: tutorialContinue,
      alreadyConfigured: true,
    })
    // update the current stepId on startup
    vscode.commands.executeCommand(COMMANDS.SET_CURRENT_POSITION, action.payload.position)
  } catch (e) {
    const error = {
      type: 'UnknownError',
      message: `Location: Editor tutorial continue config.\n\n ${e.message}`,
    }
    send({ type: 'CONTINUE_FAILED', payload: { error } })
  }
}

export default onTutorialContinueConfig
