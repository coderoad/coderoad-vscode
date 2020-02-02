import { Message as AlifdMessage } from '@alifd/next'
import * as React from 'react'

interface Props {
  type?: 'success' | 'warning' | 'error' | 'notice' | 'help' | 'loading'
  title: string
  shape?: 'inline' | 'addon' | 'toast'
  size?: 'medium' | 'large'
  children?: string
  closeable?: boolean
  onClose?: () => void
  handleClose?: () => void
}

const Message = (props: Props) => {
  const [visible, setVisible] = React.useState(true)
  function onClose() {
    if (props.onClose) {
      props.onClose()
    }
    setVisible(false)
  }
  return (
    <AlifdMessage
      type={props.type}
      visible={visible}
      title={props.title}
      closeable={props.closeable}
      onClose={onClose}
      shape={props.shape}
    >
      {props.children}
    </AlifdMessage>
  )
}

export default Message
