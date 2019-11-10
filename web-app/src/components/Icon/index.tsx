import * as React from 'react'
import { Icon as AlifdIcon } from '@alifd/next'

interface Props {
  type: string
  role?: string
  style?: React.CSSProperties
  size?: 'xxs' | 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl' | 'inherit'
}

const Icon = (props: Props) => {
  return <AlifdIcon type={props.type} role={props.role} size={props.size} style={props.style} />
}

export default Icon
