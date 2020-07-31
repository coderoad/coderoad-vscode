import * as T from 'typings'
import * as TT from 'typings/tutorial'

interface Input {
  position: T.Position
  levels: TT.Level[]
  testStatus: T.TestStatus | null
}

type Output = {
  level: T.LevelUI
  levels: T.LevelUI[]
  levelIndex: number
  stepIndex: number
}

/*
 * Format levels to include:
 * - level.status = 'ACTIVE' | 'COMPLETE' | 'INCOMPLETE'
 * - step.status = 'ACTIVE' | 'COMPLETE' | 'INCOMPLETE' | 'FAIL'
 * - step.subtasks as { name: string, status: 'ACTIVE' | 'COMPLETE' | 'INCOMPLETE' }[]
 */
const formatLevels = ({ position, levels, testStatus }: Input): Output => {
  // clone levels

  const levelIndex: number = levels.findIndex((l: TT.Level) => l.id === position.levelId)

  if (levelIndex === -1) {
    throw new Error(`Level ${position.levelId} not found`)
  }

  const currentLevel = levels[levelIndex]

  let stepIndex = currentLevel.steps.findIndex((s: TT.Step) => s.id === position.stepId)
  if (stepIndex === -1) {
    stepIndex = levels[levelIndex].steps.length
  }

  // current level
  const levelUI: T.LevelUI = {
    ...currentLevel,
    status: position.complete ? 'COMPLETE' : 'ACTIVE',
    steps: currentLevel.steps.map((step: TT.Step, index) => {
      // label step status for step component
      let status: T.ProgressStatus = 'INCOMPLETE'
      let subtasks
      if (index < stepIndex || (index === stepIndex && position.complete)) {
        status = 'COMPLETE'
      } else if (index === stepIndex) {
        status = 'ACTIVE'
      } else {
        status = 'INCOMPLETE'
      }
      if (step.subtasks && step.subtasks) {
        const testSummaries = Object.keys(testStatus?.summary || {})
        if (testSummaries.length && testSummaries.length !== step.subtasks.length) {
          // test result count and subtask count don't match
          // something is wrong with the tutorial
          // NOTE: hacky temp solution as should be caught by tutorial creators / build tools
          console.error(
            'ERROR: subtasks and test results have a different number of results. This is likely an error with the tutorial or an edited test file.',
          )
        }
        subtasks = step.subtasks.map((subtask: string, subtaskIndex: number) => {
          let subtaskStatus: T.ProgressStatus = 'INCOMPLETE'
          // task is complete, subtasks must be complete
          if (status === 'COMPLETE') {
            subtaskStatus = 'COMPLETE'
            // task is active, check which are complete from test results
          } else if (status === 'ACTIVE') {
            subtaskStatus = !!(testStatus?.summary && testStatus.summary[subtaskIndex]) ? 'COMPLETE' : 'ACTIVE'
          }
          return {
            name: subtask,
            status: subtaskStatus,
          }
        })
      }
      return { ...step, status, subtasks }
    }),
  }

  // flag all levels before as complete
  const completed: T.LevelUI[] = levels.slice(0, levelIndex).map((level: TT.Level) => ({
    ...level,
    status: 'COMPLETE',
    steps: level.steps.map((step: TT.Step) => ({
      ...step,
      status: 'COMPLETE',
      subtasks: step.subtasks ? step.subtasks.map((st) => ({ name: st, status: 'COMPLETE' })) : undefined,
    })),
  }))

  // flag all levels after as incomplete
  const incompleted: T.LevelUI[] = levels.slice(levelIndex + 1, levels.length).map((level: TT.Level) => ({
    ...level,
    status: 'INCOMPLETE',
    steps: level.steps.map((step: TT.Step) => ({
      ...step,
      status: 'INCOMPLETE',
      subtasks: step.subtasks ? step.subtasks.map((st) => ({ name: st, status: 'INCOMPLETE' })) : undefined,
    })),
  }))

  const levelsUI: T.LevelUI[] = [...completed, levelUI, ...incompleted]

  return { level: levelUI, levels: levelsUI, levelIndex, stepIndex }
}

export default formatLevels
