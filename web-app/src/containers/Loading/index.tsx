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
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
}

const LoadingPage = ({ text }: Props) => {
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
