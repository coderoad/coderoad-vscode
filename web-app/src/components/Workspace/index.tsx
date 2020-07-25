import * as React from 'react'
import { css, jsx } from '@emotion/core'
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
    maxWidth: '100%',
    backgroundColor: theme['$color-white'],
    overflow: 'auto',
  }),
}

const Workspace = ({ children }: Props) => {
  return <div css={styles.page}>{children}</div>
}

export default Workspace
