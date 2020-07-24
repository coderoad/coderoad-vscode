import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as vscode from 'vscode'
import createTestRunner from './services/testRunner'
import { onSetupActions } from './actions/onActions'
import createWebView from './services/webview'
import logger from './services/logger'

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

export const createCommands = ({ extensionPath, workspaceState }: CreateCommandProps): { [key: string]: any } => {
  // React panel webview
  let webview: any
  let currentPosition: T.Position
  let testRunner: any

  return {
    // initialize
    [COMMANDS.START]: async () => {
      console.log('start')
      if (webview && webview.state.loaded) {
        webview.createOrShow()
      } else {
        // activate machine
        webview = createWebView({
          extensionPath,
          workspaceState,
        })
      }
    },
    [COMMANDS.CONFIG_TEST_RUNNER]: async (data: TT.Tutorial) => {
      const testRunnerConfig = data.config.testRunner
      const setup = testRunnerConfig.setup || testRunnerConfig.actions // TODO: deprecate and remove config.actions
      if (setup) {
        // setup tutorial test runner commits
        // assumes git already exists
        await onSetupActions({
          actions: setup,
          send: webview.send,
          dir: testRunnerConfig.directory || testRunnerConfig.path,
        }) // TODO: deprecate and remove config.path
      }
      testRunner = createTestRunner(data, {
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
        onLoadSubtasks: ({ summary }) => {
          webview.send({ type: 'LOAD_SUBTASK_RESULTS', payload: { summary } })
        },
      })
    },
    [COMMANDS.SET_CURRENT_POSITION]: (position: T.Position) => {
      // set from last setup stepAction
      currentPosition = position
    },
    [COMMANDS.RUN_TEST]: ({
      subtasks,
      callbacks,
    }: { subtasks?: boolean; callbacks?: { onSuccess: () => void } } = {}) => {
      logger('run test current', currentPosition)
      // use stepId from client, or last set stepId
      // const position: T.Position = {
      //   ...current,
      //   stepId: current && current.position.stepId?.length ? current.position.stepId : currentPosition.stepId,
      // }
      logger('currentPosition', currentPosition)
      testRunner({ position: currentPosition, onSuccess: callbacks?.onSuccess, subtasks })
    },
    [COMMANDS.ENTER]: () => {
      webview.send({ type: 'KEY_PRESS_ENTER' })
    },
  }
}
