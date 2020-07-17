import * as React from 'react'
import { Progress, Icon } from '@alifd/next'

interface Props {
  current: number
  max: number
}

const ProgressPie = (props: Props) => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    let timeout: any
    if (progress < props.current) {
      timeout = setTimeout(() => {
        setProgress(progress + 1)
      }, 100)
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [progress])

  const progressPercent = Math.floor((progress / props.max) * 100)

  return (
    <Progress
      percent={progressPercent}
      shape="circle"
      textRender={() => (progressPercent === 100 ? <Icon type="select" size="xl" /> : `${progressPercent}%`)}
    />
  )
}

export default ProgressPie
