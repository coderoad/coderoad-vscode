import { assign } from 'xstate'
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