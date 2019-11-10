import * as React from 'react'
import { Button as AlifdButton } from '@alifd/next'

interface Props {
  children: string
  type?: 'primary' | 'secondary' | 'normal'
  onClick(): void
}

const Button = (props: Props) => (
  <AlifdButton onClick={props.onClick} type={props.type}>
    {props.children}
  </AlifdButton>
)

export default Button
