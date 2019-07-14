import * as vscode from 'vscode'
import { join } from 'path'
import { setStorage } from '../storage'
import ReactWebView from '../ReactWebView'
import { isEmptyWorkspace } from '../workspace'
import * as CR from 'typings'
import runTest from './runTest'

const COMMANDS = {
  START: 'coderoad.start',
  TUTORIAL_LAUNCH: 'coderoad.tutorial_launch',
  TUTORIAL_SETUP: 'coderoad.tutorial_setup',
  OPEN_WEBVIEW: 'coderoad.open_webview',
  SEND_STATE: 'coderoad.send_state',
  SEND_DATA: 'coderoad.send_data',
  RECEIVE_ACTION: 'coderoad.receive_action',
  OPEN_FILE: 'coderoad.open_file',
  RUN_TEST: 'coderoad.run_test',
  TEST_PASS: 'coderoad.test_pass',
  TEST_FAIL: 'coderoad.test_fail',
  SET_LAYOUT: 'coderoad.set_layout',
}

interface CreateCommandProps {
  context: vscode.ExtensionContext
  machine: CR.StateMachine
  storage: any
  git: any
  position: any
}

// React panel webview
let webview: any

export const createCommands = ({ context, machine, storage, git, position }: CreateCommandProps) => ({
  // initialize
  [COMMANDS.START]: () => {
    // set local storage workspace
    setStorage(context.workspaceState)

    // activate machine
    webview = new ReactWebView(context.extensionPath)
    console.log('webview', webview.panel.webview.postMessage)
    machine.activate()
  },
  // open React webview
  [COMMANDS.OPEN_WEBVIEW]: (column: number = vscode.ViewColumn.Two) => {
    // setup 1x1 horizontal layout
    vscode.commands.executeCommand('vscode.setEditorLayout', {
      orientation: 0,
      groups: [{ groups: [{}], size: 0.6 }, { groups: [{}], size: 0.4 }],
    })
    webview.createOrShow(column)
    // NOTE: createOrShow and layout command cannot be async
    // this creates an async issue where the webview cannot detect when it has been initialized
    setTimeout(() => {
      machine.send('WEBVIEW_INITIALIZED')
    }, 2000)
  },
  // launch a new tutorial
  // NOTE: may be better to move into action as logic is primarily non-vscode
  [COMMANDS.TUTORIAL_LAUNCH]: async (tutorial: CR.Tutorial) => {
    console.log('launch tutorial')

    await isEmptyWorkspace()

    await git.gitInitIfNotExists()

    // TODO: use actual tutorial repo
    await Promise.all([git.gitSetupRemote(tutorial.meta.repo), storage.setTutorial(tutorial), storage.resetProgress()])

    // TODO: refactor to allow client to call initialization
    const pos: CR.Position = await position.getInitial(tutorial)

    // eslint-disable-next-line
    const { steps } = tutorial.data
    const { setup } = steps[pos.stepId].actions
    await git.gitLoadCommits(setup)
    machine.send('TUTORIAL_LOADED')
  },
  [COMMANDS.TUTORIAL_SETUP]: async (tutorial: CR.Tutorial) => {
    console.log('tutorial setup', tutorial)
    // setup onSave hook
    const languageIds = tutorial.meta.languages
    console.log(`languageIds: ${languageIds.join(', ')}`)
    vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
      console.log('save document', document)
      if (languageIds.includes(document.languageId) && document.uri.scheme === 'file') {
        // do work
        machine.send('TEST_RUN')
      }
    })
  },
  // open a file
  [COMMANDS.OPEN_FILE]: async (relativeFilePath: string) => {
    console.log(`OPEN_FILE ${JSON.stringify(relativeFilePath)}`)
    try {
      const workspaceRoot = vscode.workspace.rootPath
      if (!workspaceRoot) {
        throw new Error('No workspace root path')
      }
      const absoluteFilePath = join(workspaceRoot, relativeFilePath)
      const doc = await vscode.workspace.openTextDocument(absoluteFilePath)
      await vscode.window.showTextDocument(doc, vscode.ViewColumn.One)
    } catch (error) {
      console.log(`Failed to open file ${relativeFilePath}`, error)
    }
  },
  // send messages to webview
  [COMMANDS.SEND_STATE]: (payload: { data: any; state: any }) => {
    webview.postMessage({ type: 'SET_STATE', payload })
  },
  [COMMANDS.SEND_DATA]: (payload: { data: any }) => {
    webview.postMessage({ type: 'SET_DATA', payload })
  },
  [COMMANDS.RECEIVE_ACTION]: (action: string | CR.Action) => {
    // send received actions from web-app into state machine
    machine.send(action)
  },
  [COMMANDS.RUN_TEST]: () => {
    runTest({
      onSuccess: () => machine.send('TEST_PASS'),
      onFail: () => machine.send('TEST_FAIL'),
    })
  },
  [COMMANDS.TEST_PASS]: () => {
    vscode.window.showInformationMessage('PASS')
  },
  [COMMANDS.TEST_FAIL]: () => {
    vscode.window.showWarningMessage('FAIL')
  },
  [COMMANDS.SET_LAYOUT]: () => {
    console.log('setLayout')
    vscode.commands.executeCommand('vscode.setEditorLayout', {
      orientation: 0,
      groups: [{ groups: [{}], size: 0.6 }, { groups: [{}], size: 0.4 }],
    })
  },
})
