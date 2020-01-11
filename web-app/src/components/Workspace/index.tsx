import * as React from 'react'
import { css, jsx } from '@emotion/core'

interface Props {
  children: React.ReactElement
}

const resize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
})

const Workspace = ({ children }: Props) => {
  const [dimensions, setDimensions] = React.useState(resize())

  // solution for windows getting off size
  React.useEffect(() => {
    setDimensions(resize())
  }, [window.innerHeight, window.innerWidth])

  const styles = {
    page: {
      display: 'flex' as 'flex',
      position: 'relative' as 'relative',
      margin: 0,
      backgroundColor: 'white',
    },
  }

  return <div css={{ ...styles.page, ...dimensions }}>{children}</div>
}

export default Workspace
