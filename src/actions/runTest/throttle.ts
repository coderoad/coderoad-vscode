// ensure only latest run_test action is taken
let currentId = 0

export const setLatestProcess = () => currentId++

// quick solution to prevent processing multiple results
// NOTE: may be possible to kill child process early
export const isLatestProcess = (processId: number): boolean => currentId === processId