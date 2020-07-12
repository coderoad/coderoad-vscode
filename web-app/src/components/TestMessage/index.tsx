import * as React from 'react'
import Icon from '../Icon'
import { css, jsx } from '@emotion/core'

const styles = {
  container: {
    backgroundColor: '#fff3e0',
    padding: '0.5rem',
    animationDuration: '0.3s',
    animationTimingFunction: 'ease-in-out',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    color: 'rgb(51, 51, 51)',
    fontSize: '0.8rem',
  },
  icon: {
    color: '#ff9300',
  },
  content: {
    marginLeft: '0.5rem',
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

  return visible && props.message ? (
    <div css={styles.container}>
      <Icon type="warning" style={styles.icon} size="xs" />
      <span css={styles.content}>{props.message}</span>
    </div>
  ) : null
}

export default TestMessage
