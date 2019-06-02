import { assign, send } from 'xstate'
import * as CR from 'typings'
import * as storage from '../../services/storage'
import * as git from '../../services/git'

let initialTutorial: CR.Tutorial | undefined
let initialProgress: CR.Progress = {
    levels: {},
    stages: {},
    steps: {},
    complete: false,
}

export default {
    start: async () => {
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
        // if a tutorial exists, "CONTINUE"
        // otherwise start from "NEW"
        send(canContinue ? 'CONTINUE' : 'NEW')
    },
    tutorialLoad: assign({
        // load initial data, progress & position
        data(): CR.TutorialData {
            console.log('ACTION: tutorialLoad.data')
            if (!initialTutorial) {
                throw new Error('No Tutorial loaded')
            }
            return initialTutorial.data

        },
        progress(): CR.Progress {
            console.log('ACTION: tutorialLoad.progress')
            return initialProgress
        },
        position() {
            console.log('ACTION: tutorialLoad.position')
            if (!initialTutorial) {
                throw new Error('No Tutorial loaded')
            }
            const { data } = initialTutorial

            const levelId = data.summary.levelList[0]
            const stageId = data.levels[levelId].stageList[0]
            const stepId = data.stages[stageId].stepList[0]

            const position = {
                levelId,
                stageId,
                stepId,
            }

            return position
        }
    }),

}