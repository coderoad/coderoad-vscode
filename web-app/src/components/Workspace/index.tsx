import * as React from 'react'
import { css, jsx } from '@emotion/core'
import { useWindowResize } from './resize'
import { Theme } from '../../styles/theme'

interface Props {
  children: React.ReactElement
}

const styles = {
  page: (theme: Theme) => ({
    display: 'flex' as 'flex',
    position: 'relative' as 'relative',
    margin: 0,
    width: '100vw',
    backgroundColor: theme['$color-white'],
  }),
}

const Workspace = ({ children }: Props) => {
  const dimensions = useWindowResize()
  return <div css={{ ...styles.page, ...dimensions }}>{children}</div>
}

export default Workspace
