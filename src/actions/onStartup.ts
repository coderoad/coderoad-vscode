import * as vscode from 'vscode'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as E from 'typings/error'
import Context from '../services/context/context'
import { WORKSPACE_ROOT, TUTORIAL_URL } from '../environment'
import fetch from 'node-fetch'
import logger from '../services/logger'

const onStartup = async (
  context: Context,
  workspaceState: vscode.Memento,
  send: (action: T.Action) => Promise<void>,
) => {
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

    // load tutorial from url
    if (TUTORIAL_URL) {
      try {
        const tutorialRes = await fetch(TUTORIAL_URL)
        const tutorial = await tutorialRes.json()
        send({ type: 'START_TUTORIAL_FROM_URL', payload: { tutorial } })
        return
      } catch (e) {
        console.log(`Failed to load tutorial from url ${TUTORIAL_URL} with error "${e.message}"`)
      }
    }

    // continue from tutorial from local storage
    const tutorial: TT.Tutorial | null = context.tutorial.get()

    // no stored tutorial, must start new tutorial
    if (!tutorial || !tutorial.id) {
      send({ type: 'START_NEW_TUTORIAL', payload: { env } })
      return
    }

    // load continued tutorial position & progress
    const { position, progress } = await context.setTutorial(workspaceState, tutorial)
    logger('CONTINUE STATE', position, progress)

    if (progress.complete) {
      // tutorial is already complete
      send({ type: 'TUTORIAL_ALREADY_COMPLETE', payload: { env } })
      return
    }
    // communicate to client the tutorial & stepProgress state
    send({ type: 'LOAD_STORED_TUTORIAL', payload: { env, tutorial, progress, position } })
  } catch (e) {
    const error = {
      type: 'UnknownError',
      message: `Location: Editor startup\n\n${e.message}`,
    }
    send({ type: 'EDITOR_STARTUP_FAILED', payload: { error } })
  }
}

export default onStartup
