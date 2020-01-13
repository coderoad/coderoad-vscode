import * as React from 'react'
import { css, jsx } from '@emotion/core'
import { useWindowResize } from '../../services/hooks/resize'

interface Props {
  children: React.ReactElement
}

const styles = {
  page: {
    display: 'flex' as 'flex',
    position: 'relative' as 'relative',
    margin: 0,
    backgroundColor: 'white',
  },
}

const Workspace = ({ children }: Props) => {
  const dimensions = useWindowResize()
  return <div css={{ ...styles.page, ...dimensions }}>{children}</div>
}

export default Workspace
