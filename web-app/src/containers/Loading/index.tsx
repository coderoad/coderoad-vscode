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
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    position: 'absolute' as 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  processes: {
    padding: '0 1rem',
    position: 'absolute' as 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}

const LoadingPage = ({ text, processes }: Props) => {
  const [showLoading, setShowHiding] = React.useState<boolean>(!!processes?.length)

  React.useEffect(() => {
    // wait some time before showing loading indicator
    const timeout = setTimeout(() => {
      setShowHiding(true)
    }, 500)
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
      {processes && processes.length ? (
        <div css={styles.processes}>
          <ProcessMessages processes={processes} />
        </div>
      ) : null}
    </div>
  )
}

export default LoadingPage
