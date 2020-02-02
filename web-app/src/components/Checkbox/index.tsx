import * as React from 'react'
import { Checkbox as AlifdCheckbox } from '@alifd/next'

interface Props {
  status: 'COMPLETE' | 'INCOMPLETE' | 'ACTIVE'
}

const Checkbox = (props: Props) => {
  const onChange = () => {
    /* read only */
  }

  const checked = props.status === 'COMPLETE'

  return <AlifdCheckbox checked={checked} onChange={onChange} />
}

export default Checkbox
