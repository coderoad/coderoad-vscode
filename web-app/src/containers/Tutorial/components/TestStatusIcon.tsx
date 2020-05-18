import * as React from 'react'
import Icon from '../../../components/Icon'

interface Props {
  size: 'small' | 'xs' | 'xxs'
  checked?: boolean
}

const colors = {
  complete: '#37B809',
  incomplete: 'lightgrey',
}

const TestStatusIcon = (props: Props) => {
  return (
    <Icon
      type="success-filling"
      size={props.size}
      style={{ color: props.checked ? colors.complete : colors.incomplete }}
    />
  )
}

export default TestStatusIcon
