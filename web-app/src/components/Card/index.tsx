import * as React from 'react'
import { Card as AlifdCard } from '@alifd/next'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  style?: React.CSSProperties
}

const Card = (props: Props) => (
  <AlifdCard showTitleBullet={false} contentHeight="auto" onClick={props.onClick} style={props.style}>
    {props.children}
  </AlifdCard>
)

export default Card
