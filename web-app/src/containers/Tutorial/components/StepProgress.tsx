import * as React from 'react'
import { Progress } from '@alifd/next'
import useMedia from 'use-media'

const styles = {
  progress: {
    display: 'flex' as 'flex',
    justifyContent: 'flex-end' as 'flex-end',
    alignItems: 'center' as 'center',
    width: '10rem',
    color: 'white',
  },
  text: { color: 'white' },
}

interface Props {
  current: number
  max: number
}

const StepProgress = (props: Props) => {
  const Text = (
    <span style={styles.text}>
      {props.current} of {props.max}
    </span>
  )

  const isWide = useMedia({ minWidth: '340px' })

  if (isWide) {
    return (
      <Progress
        state="success"
        progressive
        percent={(props.current / props.max) * 100}
        shape="line"
        color="rgb(85, 132, 255)"
        css={styles.progress}
        textRender={() => {
          return Text
        }}
      />
    )
  }
  return <div css={{ marginRight: '0.5rem', fontSize: '80%' }}>{Text}</div>
}

export default StepProgress
