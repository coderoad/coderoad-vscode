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
        const [tutorial, progress, hasGit, hasGitRemote] = await Promise.all([
            storage.getTutorial(),
            storage.getProgress(),
            git.gitVersion(),
            git.gitCheckRemoteExists(),
        ])
        initialTutorial = tutorial
        initialProgress = progress
        const canContinue = !!(tutorial && progress && hasGit && hasGitRemote)
        send(canContinue ? 'CONTINUE' : 'NEW')
    },
    loadTutorial: assign({
        // load initial data, progress & position
        data(): CR.TutorialData {
            if (!initialTutorial) {
                throw new Error('No Tutorial loaded')
            }
            return initialTutorial.data

        },
        progress(): CR.Progress { return initialProgress },
        position() {
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