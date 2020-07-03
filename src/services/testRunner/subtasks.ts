interface Summary {
  [key: string]: boolean
}

// if a subtask matches the current stepId name
// in the format "SUBTASKS 1.1 :1" where 1.1 is the stepId & :1 is the testId
// values will be parsed and sent to the client
const parseSubtasks = (summary: Summary, expectedStepId: string | null): Summary => {
  const subtaskRegex = /^SUBTASKS\s(?<stepId>(\d+\.\d+))\s:(?<testId>\d+)\s/
  const subtaskSummary = {}
  Object.keys(summary).forEach((key) => {
    const match = key.match(subtaskRegex)
    if (!!match) {
      const { stepId, testId } = match.groups || {}
      if (stepId === expectedStepId) {
        const testIndex = Number(testId) - 1
        subtaskSummary[testIndex] = summary[key]
      }
    }
  })
  return subtaskSummary
}

export default parseSubtasks
