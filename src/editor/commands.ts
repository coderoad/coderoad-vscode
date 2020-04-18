import * as TT from 'typings/tutorial'
import * as vscode from 'vscode'
import createTestRunner, { Payload } from '../services/testRunner'
import { setupActions } from '../actions/setupActions'
import createWebView from '../webview'

export const COMMANDS = {
  START: 'coderoad.start',
  OPEN_WEBVIEW: 'coderoad.open_webview',
  CONFIG_TEST_RUNNER: 'coderoad.config_test_runner',
  RUN_TEST: 'coderoad.run_test',
  SET_CURRENT_STEP: 'coderoad.set_current_step',
}

interface CreateCommandProps {
  extensionPath: string
  workspaceState: vscode.Memento
}

export const createCommands = ({ extensionPath, workspaceState }: CreateCommandProps) => {
  // React panel webview
  let webview: any
  let currentStepId: string | null = ''
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
        onSuccess: (payload: Payload) => {
          // send test pass message back to client
          webview.send({ type: 'TEST_PASS', payload })
        },
        onFail: (payload: Payload, message: string) => {
          // send test fail message back to client with failure message
          webview.send({ type: 'TEST_FAIL', payload: { ...payload, message } })
        },
        onError: (payload: Payload) => {
          // send test error message back to client
          webview.send({ type: 'TEST_ERROR', payload })
        },
        onRun: (payload: Payload) => {
          // send test run message back to client
          webview.send({ type: 'TEST_RUNNING', payload })
        },
      })
    },
    [COMMANDS.SET_CURRENT_STEP]: (stepId: string | null) => {
      // set from last setup stepAction
      currentStepId = stepId
    },
    [COMMANDS.RUN_TEST]: (stepId: string | null | undefined, onSuccess: () => void) => {
      // use stepId from client, or last set stepId
      const payload: Payload = { stepId: stepId || currentStepId }
      testRunner(payload, onSuccess)
    },
  }
}
