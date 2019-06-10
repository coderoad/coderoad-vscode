import basicTutorialData from '../../tutorials/basic'
import * as CR from 'typings'

const tutorialContext: CR.MachineContext = {
    position: {
        levelId: '',
        stageId: '',
        stepId: '',
    },
    progress: {
        levels: {},
        stages: {},
        steps: {},
        complete: false,
    },
    // TODO: load tutorial instead of preloading demo
    data: basicTutorialData.data,
}

export default tutorialContext