import * as React from 'react'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import Loading from '../../components/Loading'
import Message from '../../components/Message'

interface Props {
  text: string
  context?: T.MachineContext
}

const styles = {
  page: {
    position: 'relative' as 'relative',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}

const LoadingPage = ({ text, context }: Props) => {
  const [showLoading, setShowHiding] = React.useState(false)

  React.useEffect(() => {
    // wait some time before showing loading indicator
    const timeout = setTimeout(() => {
      setShowHiding(true)
    }, 600)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  if (context && context.error) {
    return (
      <div css={styles.page}>
        <Message type="error" title={context.error.title} content={context.error.description} />
      </div>
    )
  }

  // don't flash loader
  if (!showLoading) {
    return null
  }

  return (
    <div css={styles.page}>
      <Loading text={text} />
    </div>
  )
}

export default LoadingPage
