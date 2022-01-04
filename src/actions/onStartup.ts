import * as vscode from 'vscode'
import * as TT from 'typings/tutorial'
import * as E from 'typings/error'
import Context from '../services/context/context'
import { send } from '../commands'
import { WORKSPACE_ROOT, TUTORIAL_URL } from '../environment'
import fetch from 'node-fetch'
import logger from '../services/logger'

const onStartup = async (context: Context): Promise<void> => {
  try {
    // check if a workspace is open, otherwise nothing works
    const noActiveWorkspace = !WORKSPACE_ROOT.length
    if (noActiveWorkspace) {
      const error: E.ErrorMessage = {
        type: 'NoWorkspaceFound',
        message: '',
        actions: [
          {
            label: 'Open Workspace',
            transition: 'REQUEST_WORKSPACE',
          },
        ],
      }
      send({ type: 'NO_WORKSPACE', payload: { error } })
      return
    }

    const env = {
      machineId: vscode.env.machineId,
      sessionId: vscode.env.sessionId,
    }

    // continue from tutorial from local storage
    const tutorial: TT.Tutorial | null = context.tutorial.get()

    // NEW: no stored tutorial, must start new tutorial
    if (!tutorial || !tutorial.version) {
      if (TUTORIAL_URL) {
        logger(`Using tutorial url from env: ${TUTORIAL_URL}`)
        // if a tutorial URL is added, launch on startup
        try {
          const tutorialRes = await fetch(TUTORIAL_URL)
          const tutorial: TT.Tutorial = await tutorialRes.json()
          logger(`Tutorial: ${tutorial?.summary?.title} (${tutorial?.version})`)
          send({ type: 'START_TUTORIAL_FROM_URL', payload: { tutorial } })
          return
        } catch (e: any) {
          // on failure to load a tutorial url fallback to NEW
          throw new Error(`Failed to load tutorial from url ${TUTORIAL_URL} with error "${e.message}"`)
        }
      }
      // NEW from start click
      send({ type: 'START_NEW_TUTORIAL', payload: { env } })
      return
    }

    // CONTINUE_FROM_PROGRESS
    const { position } = await context.onContinue(tutorial)
    logger(`Continuing tutorial from progress: level ${position?.levelId} step ${position?.stepId}`)
    // communicate to client the tutorial & stepProgress state
    send({ type: 'LOAD_STORED_TUTORIAL', payload: { env, tutorial, position } })
  } catch (e: any) {
    const error = {
      type: 'UnknownError',
      message: `Location: Editor startup\n\n${e.message}`,
    }
    send({ type: 'EDITOR_STARTUP_FAILED', payload: { error } })
  }
}

export default onStartup
