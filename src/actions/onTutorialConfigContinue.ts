import * as vscode from 'vscode'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import Context from '../services/context/context'
import tutorialConfig from './utils/tutorialConfig'
import { COMMANDS, send } from '../commands'
import logger from '../services/logger'
import { setupWebhook } from '../services/hooks/webhooks'

const onTutorialConfigContinue = async (action: T.Action, context: Context): Promise<void> => {
  logger(`Continuing tutorial from progress: ${JSON.stringify(action.payload)}`)
  try {
    const tutorialToContinue: TT.Tutorial | null = context.tutorial.get()
    if (!tutorialToContinue) {
      throw new Error('Invalid tutorial to continue')
    }
    // update the current stepId on startup
    vscode.commands.executeCommand(COMMANDS.SET_CURRENT_POSITION, action.payload.position)
    await tutorialConfig({
      data: tutorialToContinue,
      alreadyConfigured: true,
    })

    // configure webhook
    if (tutorialToContinue.config?.webhook) {
      setupWebhook(tutorialToContinue.config.webhook)
    }
  } catch (e: any) {
    const error = {
      type: 'UnknownError',
      message: `Location: Editor tutorial continue config.\n\n ${e.message}`,
    }
    send({ type: 'CONTINUE_FAILED', payload: { error } })
  }
}

export default onTutorialConfigContinue
