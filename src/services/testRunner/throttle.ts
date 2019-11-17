// ensure only latest run_test action is taken
let lastRun = new Date()

const THROTTLE_OFFSET = 300 // ms

export const throttle = (): Date | null => {
  const now = new Date()
  if (now.getTime() > lastRun.getTime() + THROTTLE_OFFSET) {
    lastRun = now
    return lastRun
  }
  return null
}

// quick solution to prevent processing multiple results
// NOTE: may be possible to kill child process early if we migrate to tasks
export const debounce = (startTime: Date): boolean => lastRun === startTime
