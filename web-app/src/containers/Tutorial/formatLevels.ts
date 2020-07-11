import * as T from 'typings'
import * as TT from 'typings/tutorial'

interface Props {
  progress: T.Progress
  position: T.Position
  levels: TT.Level[]
  testStatus: T.TestStatus | null
}

/*
 * Format levels to include:
 * - level.status = 'ACTIVE' | 'COMPLETE' | 'INCOMPLETE'
 * - step.status = 'ACTIVE' | 'COMPLETE' | 'INCOMPLETE' | 'FAIL'
 * - step.subtasks as { name: string, pass: boolean }[]
 */
const formatLevels = ({
  progress,
  position,
  levels,
  testStatus,
}: Props): { levels: TT.Level[]; level: TT.Level; stepIndex: number } => {
  // clone levels
  const formattedLevels = [...levels]

  const level = formattedLevels.find((l: TT.Level) => l.id === position.levelId)

  if (!level) {
    throw new Error(`Level "${position.levelId}" not found`)
  }

  // add level status
  level.status = progress.levels[position.levelId] ? 'COMPLETE' : 'ACTIVE'

  // add step status
  level.steps = level.steps.map((step: TT.Step) => {
    // label step status for step component
    let status: T.ProgressStatus = 'INCOMPLETE'
    if (progress.steps[step.id]) {
      status = 'COMPLETE'
    } else if (step.id === position.stepId) {
      status = 'ACTIVE'
      if (step.subtasks && step.subtasks) {
        step.subtasks.map((subtask: string, subtaskIndex: number) => ({
          name: subtask,
          pass: !!(testStatus?.summary ? testStatus.summary[subtaskIndex] : false),
        }))
      }
    }
    return { ...step, status }
  })

  let stepIndex = level.steps.findIndex((s: TT.Step) => s.status === 'ACTIVE')
  if (stepIndex === -1) {
    stepIndex = level.steps.length
  }
  return { levels: formattedLevels, level, stepIndex }
}

export default formatLevels
