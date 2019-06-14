import { assign } from 'xstate'
// NOTE: codesmell - importing machine
import { machine } from '../../extension'
import api from '../../services/api'
import * as CR from 'typings'
import * as vscode from 'vscode'
import * as storage from '../../services/storage'
import * as git from '../../services/git'

let currentTutorial: CR.Tutorial | undefined
let currentProgress: CR.Progress = {
    levels: {},
    stages: {},
    steps: {},
    complete: false,
}

export default {
    createWebview() {
        console.log('execute coderoad.open_webview')
        vscode.commands.executeCommand('coderoad.open_webview')
    },
    async newOrContinue() {
        // verify that the user has a tutorial & progress
        // verify git is setup with a coderoad remote
        const [tutorial, progress, hasGit, hasGitRemote] = await Promise.all([
            storage.getTutorial(),
            storage.getProgress(),
            git.gitVersion(),
            git.gitCheckRemoteExists(),
        ])
        const canContinue = !!(tutorial && progress && hasGit && hasGitRemote)

        if (canContinue) {
            // continue
            currentTutorial = tutorial
            currentProgress = progress
        }

        machine.send(canContinue ? 'CONTINUE' : 'NEW')
    },
    async tutorialLaunch() {
        // TODO: add selection of tutorial id
        const tutorial: CR.Tutorial = await api({ resource: 'getTutorial', params: { id: '1' } })
        currentTutorial = tutorial
        console.log('api')
        console.log(tutorial)
        vscode.commands.executeCommand('coderoad.tutorial_launch', tutorial)
    },
    tutorialSetup() {
        vscode.commands.executeCommand('coderoad.tutorial_setup', currentTutorial)
        vscode.commands.executeCommand('coderoad.open_webview', vscode.ViewColumn.Two)
    },
    initializeNewTutorial: assign({
        position: (context: any): CR.Position => {
            const { data } = context
            const levelId = data.summary.levelList[0]
            const stageId = data.levels[levelId].stageList[0]
            const stepId = data.stages[stageId].stepList[0]
            return {
                levelId,
                stageId,
                stepId
            }
        }
    }),
    tutorialContinue: assign({
        // load initial data, progress & position
        data(): CR.TutorialData {
            console.log('ACTION: tutorialLoad.data')
            if (!currentTutorial) {
                throw new Error('No Tutorial loaded')
            }
            return currentTutorial.data

        },
        progress(): CR.Progress {
            console.log('ACTION: tutorialLoad.progress')
            return currentProgress
        },
        position(context: any): CR.Position {
            console.log('ACTION: tutorialLoad.position')
            if (!currentTutorial) {
                throw new Error('No Tutorial loaded')
            }

            const { data } = currentTutorial

            const { levelList } = data.summary
            // take next incomplete level or the final step
            const levelId = levelList.find((id: string) => !currentProgress.levels[id]) || levelList[levelList.length - 1]
            const { stageList } = data.levels[levelId]
            const stageId = stageList.find((id: string) => !currentProgress.stages[id]) || stageList[stageList.length - 1]
            const { stepList } = data.stages[stageId]
            const stepId = stepList.find((id: string) => !currentProgress.steps[id]) || stepList[stepList.length - 1]

            const position = {
                levelId,
                stageId,
                stepId
            }
            console.log('position', position)
            return position
        }
    }),
    tutorialLoadNext() {
        machine.send('LOAD_NEXT')
    },
    testStart() {
        vscode.commands.executeCommand('coderoad.run_test')
    },
    testPass() {
        vscode.window.showInformationMessage('PASS')
    },
    testFail() {
        vscode.window.showWarningMessage('FAIL')
    },
    // @ts-ignore
    stepComplete: assign({
        progress: (context: CR.MachineContext): CR.Progress => {
            const nextProgress = {
                ...context.progress,
                steps: {
                    ...context.progress.steps,
                    [context.position.stepId]: true,
                }
            }
            console.log('progress update', nextProgress)
            storage.setProgress(nextProgress)
            return nextProgress
        }
    }),
    // @ts-ignore
    stageComplete: assign({
        progress: (context: CR.MachineContext): CR.Progress => {
            const nextProgress = {
                ...context.progress,
                stages: {
                    ...context.progress.stages,
                    [context.position.stageId]: true,
                }
            }
            console.log('progress update', nextProgress)
            storage.setProgress(nextProgress)
            return nextProgress
        }
    }),
    // @ts-ignore
    levelComplete: assign({
        progress: (context: CR.MachineContext): CR.Progress => {
            const nextProgress = {
                ...context.progress,
                levels: {
                    ...context.progress.levels,
                    [context.position.levelId]: true,
                }
            }
            console.log('progress update', nextProgress)
            storage.setProgress(nextProgress)
            return nextProgress

        }
    }),
    // @ts-ignore
    tutorialComplete: assign({
        progress: (context: CR.MachineContext): CR.Progress => {
            const nextProgress = {
                ...context.progress,
                complete: true,
            }
            console.log('progress update', nextProgress)
            storage.setProgress(nextProgress)
            return nextProgress
        }
    }),
    stepLoadNext: assign({
        position: (context: any): CR.Position => {
            const { data, position } = context
            const { stepList } = data.stages[position.stageId]
            const currentStepIndex = stepList.indexOf(position.stepId)

            const nextStepId = (currentStepIndex < stepList.length)
                ? stepList[currentStepIndex + 1]
                : position.stepId

            const nextPosition = {
                ...context.position,
                stepId: nextStepId,
            }
            console.log('position update', nextPosition)
            return nextPosition
        }
    }),
    loadLevel() {
        console.log('loadLevel')
    },
    loadStage() {
        console.log('loadStage')
    }
}