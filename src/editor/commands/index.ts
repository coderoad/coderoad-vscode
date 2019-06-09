import * as vscode from 'vscode'
import { join } from 'path'
import { setStorage } from '../storage'
import ReactWebView from '../ReactWebView'
import * as CR from 'typings'

const COMMANDS = {
    START: 'coderoad.start',
    OPEN_WEBVIEW: 'coderoad.open_webview',
    OPEN_FILE: 'coderoad.open_file',
    RUN_TEST: 'coderoad.test_run',
}

interface CreateCommandProps {
    context: vscode.ExtensionContext,
    machine: CR.StateMachine
}

// React panel webview
let webview: any;

export const createCommands = ({ context, machine }: CreateCommandProps) => ({
    [COMMANDS.START]: () => {
        // set local storage workspace
        setStorage(context.workspaceState)

        // activate machine
        webview = new ReactWebView(context.extensionPath, machine.onReceive)
        machine.activate()
    },
    [COMMANDS.OPEN_WEBVIEW]: () => {
        webview.createOrShow();
    },
    [COMMANDS.OPEN_FILE]: async (relativeFilePath: string) => {
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
    }
})