import * as React from 'react'
import Icon from '../../../components/Icon'

interface Props {
  size: 'small' | 'xs'
  status: 'COMPLETE' | 'ACTIVE' | 'INCOMPLETE' | 'FAIL'
}

const styles = {
  complete: {
    icon: 'success-filling',
    color: '#37B809',
  },
  active: {
    icon: 'success-filling',
    color: 'lightgrey',
  },
  fail: {
    icon: 'warning',
    color: '#ff9300',
  },
}

const TestStatusIcon = (props: Props) => {
  // @ts-ignore
  const style: { icon: string; color: string } = styles[props.status.toLowerCase()]
  return <Icon type="success-filling" size={props.size} style={{ color: style.color }} />
}

export default TestStatusIcon
