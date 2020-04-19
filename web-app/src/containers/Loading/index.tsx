import * as React from 'react'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import Loading from '../../components/Loading'
import ProcessMessages from 'components/ProcessMessages'

interface Props {
  text: string
  processes?: T.ProcessEvent[]
}

const styles = {
  page: {
    position: 'relative' as 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  processes: {
    padding: '0 1rem',
    position: 'fixed' as 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
}

const LoadingPage = ({ text, processes }: Props) => {
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
      <Loading message={text} />
      {processes && processes.length && (
        <div css={styles.processes}>
          <ProcessMessages processes={processes} />
        </div>
      )}
    </div>
  )
}

export default LoadingPage
