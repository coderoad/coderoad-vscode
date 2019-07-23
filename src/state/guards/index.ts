import * as CR from 'typings'

export default {
  hasNextStep: (context: CR.MachineContext): boolean => {
    const { data, position, progress } = context
    const steps = data.stages[position.stageId].stepList
    const stageIncomplete = !progress.stages[position.stageId]
    const isNotFinalStep = (!!position.stepId && (steps[steps.length - 1] !== position.stepId))
    const hasNext = stageIncomplete || isNotFinalStep
    console.log('GUARD: hasNextStep', hasNext)
    return hasNext
  },
  hasNextStage: (context: CR.MachineContext): boolean => {
    const { data, position, progress } = context
    const stages = data.levels[position.levelId].stageList
    const stageComplete = progress.stages[position.stageId]
    const isNotFinalStage = !!position.stageId && stages[stages.length - 1] !== position.stageId
    const hasNext = stageComplete && isNotFinalStage
    console.log('GUARD: hasNextStage', hasNext)
    return hasNext
  },
  hasNextLevel: (context: CR.MachineContext): boolean => {
    const { data, position, progress } = context
    const levels = data.summary.levelList
    const levelComplete = progress.levels[position.levelId]
    const isNotFinalLevel = !!position.levelId && levels[levels.length - 1] !== position.levelId
    const hasNext = levelComplete && isNotFinalLevel
    console.log('GUARD: hasNextLevel', hasNext)
    return hasNext
  },
}
