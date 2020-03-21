import * as React from 'react'
import { css, jsx } from '@emotion/core'

const styles = {
  tag: {
    padding: '3px',
    backgroundColor: 'rgb(225, 236, 244)',
    color: 'rgb(57, 115, 157)',
  },
}

type Props = {
  children: string
}

const Tag = (props: Props) => <div css={styles.tag}>{props.children}</div>

export default Tag
