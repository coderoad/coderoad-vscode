import * as React from 'react'
import Icon from '../../../components/Icon'

interface Props {
  size: 'small' | 'xs' | 'xxs'
  checked?: boolean
}

const TestStatusIcon = (props: Props) => {
  return <Icon type="success-filling" size={props.size} style={{ color: props.checked ? '#37B809' : 'lightgrey' }} />
}

export default TestStatusIcon
