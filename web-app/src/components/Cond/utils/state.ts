export function stateMatch(state: any, statePath: string) {
  let current = state
  const paths = statePath.split('.')
  let complete = false
  try {
    for (const p of paths) {
      if (p === current && !complete) {
        // handle strings
        complete = true
      } else {
        // handle objects
        current = current[p]
      }
    }
  } catch (error) {
    return false
  }
  return current !== undefined
}
