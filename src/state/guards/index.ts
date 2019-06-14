import * as CR from 'typings'

export default {
    hasNextStep: (context: CR.MachineContext): boolean => {
        const { data, position, progress } = context
        const steps = data.stages[position.stageId].stepList
        // isn't final step yet
        if (steps[steps.length - 1] !== position.stepId) {
            return true
        }
        // final step is not yet complete
        return !progress.steps[position.stepId]
    },
    hasNextStage: (context: CR.MachineContext): boolean => {
        const { data, position } = context
        const stages = data.levels[position.levelId].stageList
        const hasNext = stages[stages.length - 1] !== position.stageId
        console.log('GUARD: hasNextStage', hasNext)
        return hasNext
    },
    hasNextLevel: (context: CR.MachineContext): boolean => {
        const { data, position } = context
        const levels = data.summary.levelList
        const hasNext = levels[levels.length - 1] !== position.levelId
        console.log('GUARD: hasNextLevel', hasNext)
        return hasNext
    },
}
