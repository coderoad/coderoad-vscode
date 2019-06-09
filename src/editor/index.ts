import * as vscode from 'vscode'
import * as CR from '../typings'
import { setStorage } from './storage'
import ReactWebView from './ReactWebView'

class Editor {
    // extension context set on activation
    // @ts-ignore
    private context: vscode.ExtensionContext
    private workspaceRoot: string | undefined
    private machine: CR.StateMachine
    private webview: any

    private COMMANDS = {
        START: 'coderoad.start',
        OPEN_WEBVIEW: 'coderoad.open_webview',
        RUN_TEST: 'coderoad.test_run',
    }

    constructor(machine: CR.StateMachine) {
        this.machine = machine
    }

    private commandStart = (): void => {
        // set workspace root
        const { rootPath } = vscode.workspace
        if (!rootPath) {
            throw new Error('Requires a workspace. Please open a folder')
        }
        this.workspaceRoot = rootPath

        // set local storage workspace
        setStorage(this.context.workspaceState)

        // activate machine
        this.webview = new ReactWebView(this.context.extensionPath, this.machine.onReceive)
        this.machine.activate()

        console.log('command start webview')
        console.log(this.webview)
    }

    private activateCommands = (): void => {
        console.log('this.COMMANDS', this.COMMANDS)
        const commands = {
            [this.COMMANDS.START]: () => {
                console.log('start')
                this.commandStart()
            },
            [this.COMMANDS.OPEN_WEBVIEW]: () => {
                console.log('open webview')
                console.log(this.webview)
                this.webview.createOrShow();
            },
        }
        for (const cmd in commands) {
            const command: vscode.Disposable = vscode.commands.registerCommand(cmd, commands[cmd])
            this.context.subscriptions.push(command)
        }
    }
    public activate = (context: vscode.ExtensionContext): void => {
        console.log('ACTIVATE!')
        this.context = context
        // commands
        this.activateCommands()

        // setup tasks or views here

    }
    public deactivate = (): void => {
        console.log('DEACTIVATE!')
        // cleanup subscriptions/tasks
        for (const disposable of this.context.subscriptions) {
            disposable.dispose()
        }
        // shut down state machine
        this.machine.deactivate()
    }
}

export default Editor