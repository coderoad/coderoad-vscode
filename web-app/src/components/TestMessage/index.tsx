import * as React from 'react'
import Icon from '../Icon'
import { css, jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { Theme } from '../../styles/theme'

const styles = {
  container: (theme: Theme) => ({
    backgroundColor: theme['$color-warning-1'],
    padding: '0.5rem',
    animationDuration: '0.3s',
    animationTimingFunction: 'ease-in-out',
    borderTopLeftRadius: theme['$corner-1'],
    borderTopRightRadius: theme['$corner-1'],
    color: theme['$color-text1-3'],
    fontSize: theme['$font-size-caption'],
  }),
  icon: (theme: Theme) => ({
    color: theme['$color-warning-3'],
  }),
  content: {
    padding: '0 0.5rem',
  },
}

interface Props {
  message?: string
}

const TestMessage = (props: Props) => {
  const [visible, setVisible] = React.useState(true)

  React.useEffect(() => {
    setVisible(true)
    const timeout = setTimeout(() => {
      setVisible(false)
    }, 4500)
    return () => {
      clearTimeout(timeout)
    }
  }, [props.message])

  const theme: Theme = useTheme()
  return visible && props.message ? (
    <div css={styles.container}>
      <Icon type="warning" style={styles.icon(theme)} size="xs" />
      <span css={styles.content}>{props.message}</span>
    </div>
  ) : null
}

export default TestMessage
