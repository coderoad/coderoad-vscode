import { useEffect, useState } from 'react'

interface ProgressConfig {
  start?: number
  stop: number
  updateDuration?: number
}

const useNaturalProgress = (config: ProgressConfig): number => {
  const { start, stop, updateDuration } = config
  const [progress, setProgress] = useState(start || 0)
  useEffect(() => {
    let timeout: any
    let difference = (stop - progress) / 4
    // for difference>0.01 update progress or make it stop
    let newProgress = difference > 0.01 ? progress + difference : stop
    if (progress < stop) {
      timeout = setTimeout(() => {
        setProgress(newProgress)
      }, updateDuration || 100)
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [progress, stop, updateDuration])
  return progress
}

export default useNaturalProgress
