import * as React from 'react'
import { Progress, Icon } from '@alifd/next'
import useNaturalProgress from 'services/hooks/useNaturalProgress'

interface Props {
  current: number
  max: number
}

const ProgressPie = (props: Props) => {
  const progress = useNaturalProgress({ stop: props.current })

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
