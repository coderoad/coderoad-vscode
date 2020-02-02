import { Button as AlifdButton } from '@alifd/next'
import * as React from 'react'

interface Props {
  style?: React.CSSProperties
  children: string | React.ReactNode
  disabled?: boolean
  type?: 'primary' | 'secondary' | 'normal'
  onClick?: () => void
  size?: 'small' | 'medium' | 'large'
  iconSize?: 'xxs' | 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl'
}

const Button = (props: Props) => (
  <AlifdButton
    onClick={props.onClick}
    type={props.type}
    disabled={props.disabled}
    style={props.style}
    size={props.size}
    iconSize={props.iconSize}
  >
    {props.children}
  </AlifdButton>
)

export default Button
