import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as vscode from 'vscode'
import createTestRunner from '../services/testRunner'
import { setupActions } from '../actions/setupActions'
import createWebView from '../services/webview'
import logger from '../services/logger'

export const COMMANDS = {
  START: 'coderoad.start',
  OPEN_WEBVIEW: 'coderoad.open_webview',
  CONFIG_TEST_RUNNER: 'coderoad.config_test_runner',
  RUN_TEST: 'coderoad.run_test',
  SET_CURRENT_POSITION: 'coderoad.set_current_position',
}

interface CreateCommandProps {
  extensionPath: string
  workspaceState: vscode.Memento
}

export const createCommands = ({ extensionPath, workspaceState }: CreateCommandProps) => {
  // React panel webview
  let webview: any
  let currentPosition: T.Position
  let testRunner: any

  return {
    // initialize
    [COMMANDS.START]: async () => {
      let webviewState: 'INITIALIZING' | 'RESTARTING'
      if (!webview) {
        webviewState = 'INITIALIZING'
      } else if (webview.loaded) {
        // already loaded
        vscode.window.showInformationMessage('CodeRoad already open')
        return
      } else {
        webviewState = 'RESTARTING'
      }

      // activate machine
      webview = createWebView({
        extensionPath,
        workspaceState,
      })
    },
    // open React webview
    [COMMANDS.OPEN_WEBVIEW]: () => {
      // setup 1x1 horizontal layout
      webview.createOrShow()
    },
    [COMMANDS.CONFIG_TEST_RUNNER]: async (config: TT.TutorialTestRunnerConfig) => {
      if (config.actions) {
        // setup tutorial test runner commits
        // assumes git already exists
        await setupActions({ actions: config.actions, send: webview.send, path: config.path })
      }
      testRunner = createTestRunner(config, {
        onSuccess: (position: T.Position) => {
          logger('test pass position', position)
          // send test pass message back to client
          webview.send({ type: 'TEST_PASS', payload: { position } })
        },
        onFail: (position: T.Position, failSummary: T.TestFail): void => {
          // send test fail message back to client with failure message
          webview.send({ type: 'TEST_FAIL', payload: { position, fail: failSummary } })
        },
        onError: (position: T.Position) => {
          // TODO: send test error message back to client
          const message = 'Error with test runner'
          webview.send({ type: 'TEST_ERROR', payload: { position, message } })
        },
        onRun: (position: T.Position) => {
          // send test run message back to client
          webview.send({ type: 'TEST_RUNNING', payload: { position } })
        },
      })
    },
    [COMMANDS.SET_CURRENT_POSITION]: (position: T.Position) => {
      // set from last setup stepAction
      currentPosition = position
    },
    [COMMANDS.RUN_TEST]: (callback?: { onSuccess: () => void }) => {
      logger('run test current', currentPosition)
      // use stepId from client, or last set stepId
      // const position: T.Position = {
      //   ...current,
      //   stepId: current && current.position.stepId?.length ? current.position.stepId : currentPosition.stepId,
      // }
      testRunner(currentPosition, callback?.onSuccess)
    },
  }
}
