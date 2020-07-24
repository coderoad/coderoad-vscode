import * as React from 'react'
import { Progress } from '@alifd/next'
import useMedia from 'use-media'
import { useTheme } from 'emotion-theming'
import { Theme } from '../../../styles/theme'

const styles = {
  progress: (theme: Theme) => ({
    display: 'flex' as 'flex',
    justifyContent: 'flex-end' as 'flex-end',
    alignItems: 'center' as 'center',
    width: '10rem',
    color: theme['$color-white'],
  }),
  text: (theme: Theme) => ({
    color: theme['$color-white'],
    marginRight: '0.5rem',
    fontSize: '80%',
  }),
}

interface Props {
  current: number
  max: number
}

const StepProgress = (props: Props) => {
  const theme: Theme = useTheme()
  const isWide = useMedia({ minWidth: '340px' })

  const Text = `${props.current} of ${props.max}`

  if (isWide) {
    return (
      <Progress
        state="success"
        progressive
        percent={(props.current / props.max) * 100}
        shape="line"
        color={theme['$color-brand1-9']}
        css={styles.progress}
        textRender={() => {
          return Text
        }}
      />
    )
  }
  return <div css={styles.text}>{Text}</div>
}

export default StepProgress
