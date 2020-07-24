import * as React from 'react'
import { useTheme } from 'emotion-theming'
import { Badge } from '@alifd/next'

const styles = {
  betaBadge: (theme: any) => ({
    backgroundColor: theme['$color-brand1-9'], // '#6a67ce',
    color: theme['$color-white'],
  }),
}

type Props = {
  children: React.ReactElement | string
}

const BetaBadge = ({ children }: Props) => {
  const theme = useTheme()
  return (
    <Badge content="beta" style={styles.betaBadge(theme)}>
      {children}&nbsp;&nbsp;
    </Badge>
  )
}

export default BetaBadge
