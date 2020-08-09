import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as vscode from 'vscode'
import createTestRunner from './services/testRunner'
import createWebView from './services/webview'
import * as hooks from './services/hooks'
import logger from './services/logger'
import * as actions from './actions'
import Channel from './channel'

export const COMMANDS = {
  START: 'coderoad.start',
  CONFIG_TEST_RUNNER: 'coderoad.config_test_runner',
  RUN_TEST: 'coderoad.run_test',
  SET_CURRENT_POSITION: 'coderoad.set_current_position',
  ENTER: 'coderoad.enter',
}

interface CreateCommandProps {
  extensionPath: string
  workspaceState: vscode.Memento
}

let sendToClient = (action: T.Action): void => {
  // function is replaced when webclient loads
}

// This makes it easier to pass the send
// function throughout the codebase
export const send = (action: T.Action): void => {
  // load error page if error action is triggered
  actions.onErrorPage(action)

  logger(`EXT TO CLIENT: "${typeof action === 'string' ? action : action.type}"`)

  if (action) sendToClient(action)
}

export const createCommands = ({ extensionPath, workspaceState }: CreateCommandProps): { [key: string]: any } => {
  // React panel webview
  let webview: any
  let currentPosition: T.Position
  let testRunner: any
  const channel = new Channel(workspaceState)

  return {
    // initialize
    [COMMANDS.START]: async () => {
      if (webview && webview.state.loaded) {
        webview.createOrShow()
      } else {
        // activate machine
        webview = await createWebView({
          extensionPath,
          channel,
        })
        // make send to client function exportable
        // as "send".
        sendToClient = webview.send
      }
    },
    [COMMANDS.CONFIG_TEST_RUNNER]: async ({
      data,
      alreadyConfigured,
    }: {
      data: TT.Tutorial
      alreadyConfigured: boolean
    }) => {
      if (!alreadyConfigured) {
        const setupActions = data.config.setup
        if (setupActions) {
          hooks.onInit(setupActions)
        }
      }
      testRunner = createTestRunner(data, {
        onSuccess: (position: T.Position) => {
          logger('test pass position', position)
          // send test pass message back to client
          channel.context.position.set({ ...position, complete: true })
          send({ type: 'TEST_PASS', payload: { position: { ...position, complete: true } } })
        },
        onFail: (position: T.Position, failSummary: T.TestFail): void => {
          // send test fail message back to client with failure message
          send({ type: 'TEST_FAIL', payload: { position, fail: failSummary } })
        },
        onError: (position: T.Position) => {
          // TODO: send test error message back to client
          const message = 'Error with test runner'
          send({ type: 'TEST_ERROR', payload: { position, message } })
        },
        onRun: (position: T.Position) => {
          // send test run message back to client
          send({ type: 'TEST_RUNNING', payload: { position } })
        },
        onLoadSubtasks: ({ summary }) => {
          send({ type: 'LOAD_SUBTASK_RESULTS', payload: { summary } })
        },
      })
    },
    [COMMANDS.SET_CURRENT_POSITION]: (position: T.Position) => {
      // set from last setup stepAction
      currentPosition = position
      channel.context.position.set(position)
    },
    [COMMANDS.RUN_TEST]: ({
      subtasks,
      callbacks,
    }: { subtasks?: boolean; callbacks?: { onSuccess: () => void } } = {}) => {
      testRunner({ position: currentPosition, onSuccess: callbacks?.onSuccess, subtasks })
    },
    [COMMANDS.ENTER]: () => {
      send({ type: 'KEY_PRESS_ENTER' })
    },
  }
}
