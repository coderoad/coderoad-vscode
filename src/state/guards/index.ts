import * as CR from 'typings'

export default {
    // skip to the stage if the level has already been started
    hasNoNextLevelProgress: (context: CR.MachineContext): boolean => {
        console.log('GUARD: hasNoNextLevelProgress')
        return false
    },
    tasksComplete: (context: CR.MachineContext): boolean => {
        console.log('GUARD: tasksComplete')
        return false
    },
    hasNextStep: (context: CR.MachineContext): boolean => {
        console.log('GUARD: hasNextStep')
        const { data, position, progress } = context
        const steps = data.stages[position.stageId].stepList
        const isStageComplete = progress.stages[position.stageId] || steps[steps.length - 1] === position.stepId
        return !isStageComplete
    },
    hasNextStage: (context: CR.MachineContext): boolean => {
        console.log('GUARD: hasNextStage')
        const { data, position, progress } = context
        const stages = data.levels[position.levelId].stageList
        const isLevelComplete = progress.levels[position.levelId] || stages[stages.length - 1] === position.stageId
        return !isLevelComplete
    },
    hasNextLevel: (context: CR.MachineContext): boolean => {
        console.log('GUARD: hasNextLevel')
        const { data, position, progress } = context
        const levels = data.summary.levelList
        const isTutorialComplete = progress.complete || levels[levels.length - 1] === position.levelId
        return !isTutorialComplete
    },
}
