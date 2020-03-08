import * as React from 'react'
import { Badge } from '@alifd/next'

const styles = {
  betaBadge: {
    backgroundColor: '#6a67ce',
    color: '#FFFFFF',
  },
}

type Props = {
  children: React.ReactElement | string
}

const BetaBadge = ({ children }: Props) => {
  return (
    <Badge content="beta" style={styles.betaBadge}>
      {children}&nbsp;&nbsp;
    </Badge>
  )
}

export default BetaBadge
