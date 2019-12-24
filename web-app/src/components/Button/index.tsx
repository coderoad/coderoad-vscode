import { Button as AlifdButton } from '@alifd/next'
import * as React from 'react'

interface Props {
  style?: React.CSSProperties
  children: string | React.ReactNode
  disabled?: boolean
  type?: 'primary' | 'secondary' | 'normal'
  onClick?: () => void
}

const Button = (props: Props) => (
  <AlifdButton onClick={props.onClick} type={props.type} disabled={props.disabled} style={props.style}>
    {props.children}
  </AlifdButton>
)

export default Button
