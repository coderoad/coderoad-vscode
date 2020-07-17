import * as React from 'react'
import { Progress, Icon } from '@alifd/next'

const ProgressPie = () => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    if (progress < 100) {
      const intervals = [10, 20]
      const randomInteval = intervals[Math.floor(Math.random() * intervals.length)]
      setTimeout(() => {
        setProgress(progress + randomInteval)
      }, 200)
    }
  }, [progress])

  return (
    <Progress
      percent={progress}
      shape="circle"
      textRender={() => (progress === 100 ? <Icon type="select" size="xl" /> : null)}
    />
  )
}

export default ProgressPie
