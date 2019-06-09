import * as vscode from 'vscode'
import { join } from 'path'
import { setStorage } from '../storage'
import ReactWebView from '../ReactWebView'
import * as CR from 'typings'

const COMMANDS = {
    START: 'coderoad.start',
    NEW_OR_CONTINUE: 'coderoad.new_or_continue',
    OPEN_WEBVIEW: 'coderoad.open_webview',
    SEND_STATE: 'coderoad.send_state',
    OPEN_FILE: 'coderoad.open_file',
    RUN_TEST: 'coderoad.test_run',
}

interface CreateCommandProps {
    context: vscode.ExtensionContext,
    machine: CR.StateMachine,
    storage: any,
    git: any
}

// React panel webview
let webview: any;
let initialTutorial: CR.Tutorial | undefined
let initialProgress: CR.Progress = {
    levels: {},
    stages: {},
    steps: {},
    complete: false,
}

export const createCommands = ({ context, machine, storage, git }: CreateCommandProps) => ({
    // initialize
    [COMMANDS.START]: () => {
        // set local storage workspace
        setStorage(context.workspaceState)

        // activate machine
        webview = new ReactWebView(context.extensionPath, machine.onReceive)
        console.log('webview', webview.panel.webview.postMessage)
        machine.activate()
    },
    [COMMANDS.NEW_OR_CONTINUE]: async () => {
        // verify that the user has a tutorial & progress
        // verify git is setup with a coderoad remote
        const [tutorial, progress, hasGit, hasGitRemote] = await Promise.all([
            storage.getTutorial(),
            storage.getProgress(),
            git.gitVersion(),
            git.gitCheckRemoteExists(),
        ])
        initialTutorial = tutorial
        initialProgress = progress
        const canContinue = !!(tutorial && progress && hasGit && hasGitRemote)
        console.log('canContinue', canContinue)
        // if a tutorial exists, "CONTINUE"
        // otherwise start from "NEW"
        machine.send(canContinue ? 'CONTINUE' : 'NEW')
    },
    // open React webview
    [COMMANDS.OPEN_WEBVIEW]: (column: number = vscode.ViewColumn.One) => {
        webview.createOrShow(column);
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
    [COMMANDS.SEND_STATE]: (action: CR.Action) => {
        console.log(`SEND ${JSON.stringify(action)}`)
        console.log('webview')
        console.log(webview)
        // console.log(webview.currentPanel)
        // if (!webview || !webview.currentPanel) {
        //     throw new Error('No valid panel available')
        // }
        webview.postMessage(action)

    }
})