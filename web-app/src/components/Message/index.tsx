import * as React from 'react'
import { Message as AlifdMessage } from '@alifd/next'

interface Props {
  type: 'error'
  title: string
  description?: string
}

const Message = (props: Props) => {
  return (
    <AlifdMessage type={props.type} title={props.title}>
      {props.description}
    </AlifdMessage>
  )
}

export default Message
