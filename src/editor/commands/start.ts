import * as vscode from 'vscode'
import { setWorkspaceRoot } from '../../services/node'
import { setStorage } from '../../editor/storage'
import { activate as activateMachine, default as machine } from '../../state'
import * as storage from '../../services/storage'
import * as git from '../../services/git'
import * as CR from 'typings'

let initialTutorial: CR.Tutorial | undefined
let initialProgress: CR.Progress = {
    levels: {},
    stages: {},
    steps: {},
    complete: false,
}

export default async function start(context: vscode.ExtensionContext): Promise<void> {
    console.log('TUTORIAL_START')

    // setup connection to workspace
    // await setWorkspaceRoot()
    // set workspace context path
    // await setStorage(context.workspaceState)

    // initialize state machine
    activateMachine()

    console.log('ACTION: start')

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
}