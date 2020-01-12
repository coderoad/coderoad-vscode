import { Card as AlifdCard } from '@alifd/next'
import * as React from 'react'

const styles = {
  card: {
    display: 'flex',
    width: '100%',
  },
}

interface Props {
  children: React.ReactNode
  onClick?: () => void
  style?: React.CSSProperties
}

const Card = (props: Props) => (
  <AlifdCard
    showTitleBullet={false}
    contentHeight="auto"
    onClick={props.onClick}
    css={{ ...styles.card, ...props.style }}
  >
    {props.children}
  </AlifdCard>
)

export default Card
