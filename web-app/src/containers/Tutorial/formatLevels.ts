import * as T from 'typings'
import * as TT from 'typings/tutorial'

interface Input {
  progress: T.Progress
  position: T.Position
  levels: TT.Level[]
  testStatus: T.TestStatus | null
}

type Output = {
  level: T.LevelUI
  stepIndex: number
}

/*
 * Format levels to include:
 * - level.status = 'ACTIVE' | 'COMPLETE' | 'INCOMPLETE'
 * - step.status = 'ACTIVE' | 'COMPLETE' | 'INCOMPLETE' | 'FAIL'
 * - step.subtasks as { name: string, status: 'ACTIVE' | 'COMPLETE' | 'INCOMPLETE' }[]
 */
const formatLevels = ({ progress, position, levels, testStatus }: Input): Output => {
  // clone levels

  const level: TT.Level | undefined = levels.find((l: TT.Level) => l.id === position.levelId)

  if (!level) {
    throw new Error(`Level ${position.levelId} not found`)
  }

  const levelUI: T.LevelUI = {
    ...level,
    status: progress.levels[position.levelId] ? 'COMPLETE' : 'ACTIVE',
    steps: level.steps.map((step: TT.Step) => {
      // label step status for step component
      let status: T.ProgressStatus = 'INCOMPLETE'
      let subtasks
      if (progress.steps[step.id]) {
        status = 'COMPLETE'
      } else if (step.id === position.stepId) {
        status = 'ACTIVE'
        if (step.subtasks && step.subtasks) {
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
      }
      return { ...step, status, subtasks }
    }),
  }
  let stepIndex = levelUI.steps.findIndex((s: T.StepUI) => s.status === 'ACTIVE')
  if (stepIndex === -1) {
    stepIndex = level.steps.length
  }
  return { level: levelUI, stepIndex }
}

export default formatLevels
