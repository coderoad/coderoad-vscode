import * as CR from 'typings'

export default {
  hasNextStep: (context: CR.MachineContext): boolean => {
    const { data, position, progress } = context
    const steps = data.stages[position.stageId].stepList
    // isn't final step yet
    const hasNext = !!position.stepId && (steps[steps.length - 1] !== position.stepId) || !progress.stages[position.stageId]
    console.log('GUARD: hasNextStep', hasNext)
    return hasNext
  },
  hasNextStage: (context: CR.MachineContext): boolean => {
    const { data, position } = context
    const stages = data.levels[position.levelId].stageList
    const hasNext = !!position.stageId && stages[stages.length - 1] !== position.stageId
    console.log('GUARD: hasNextStage', hasNext)
    return hasNext
  },
  hasNextLevel: (context: CR.MachineContext): boolean => {
    const { data, position } = context
    const levels = data.summary.levelList
    const hasNext = !!position.levelId && levels[levels.length - 1] !== position.levelId
    console.log('GUARD: hasNextLevel', hasNext)
    return hasNext
  },
}
