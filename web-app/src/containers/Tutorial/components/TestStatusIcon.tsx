import * as React from 'react'
import { useTheme } from 'emotion-theming'
import Icon from '../../../components/Icon'
import { Theme } from '../../../styles/theme'

interface Props {
  size: 'small' | 'xs'
  status: 'COMPLETE' | 'ACTIVE' | 'INCOMPLETE' | 'FAIL'
}

const styles = {
  complete: (theme: Theme) => ({
    icon: 'success-filling',
    color: theme['$color-success-3'],
  }),
  active: (theme: Theme) => ({
    icon: 'success-filling',
    color: theme['$color-disabled-1'],
  }),
  fail: (theme: Theme) => ({
    icon: 'warning',
    color: theme['$color-warning-3'],
  }),
  incomplete: (theme: Theme) => ({
    icon: 'lock',
    color: theme['$color-disabled-1'],
  }),
}

const TestStatusIcon = (props: Props) => {
  const theme: Theme = useTheme()
  // @ts-ignore(
  const style: { icon: string; color: string } = styles[props.status.toLowerCase()](theme)
  return <Icon type={style.icon} size={props.size} style={{ color: style.color }} />
}

export default TestStatusIcon
