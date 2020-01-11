import { Icon as AlifdIcon } from '@alifd/next'
import * as React from 'react'
import { css, jsx } from '@emotion/core'

interface Props {
  type: string
  role?: string
  style?: React.CSSProperties
  size?: 'xxs' | 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl' | 'inherit'
}

const Icon = (props: Props) => {
  return <AlifdIcon type={props.type} role={props.role} size={props.size} css={props.style} />
}

export default Icon
