import * as React from 'react'
import { useTheme } from 'emotion-theming'
import { Badge } from '@alifd/next'
import { Theme } from '../../styles/theme'

const styles = {
  betaBadge: (theme: Theme) => ({
    backgroundColor: theme['$color-brand1-9'],
    color: theme['$color-white'],
  }),
}

type Props = {
  children: React.ReactElement | string
}

const BetaBadge = ({ children }: Props) => {
  const theme: Theme = useTheme()
  return (
    <Badge content="beta" style={styles.betaBadge(theme)}>
      {children}&nbsp;&nbsp;
    </Badge>
  )
}

export default BetaBadge
