import { Notification } from '@alifd/next'

interface Props {
  key: string
  title: string
  content: string
  duration?: number
  onClose?: () => void
  icon?: string
}

Notification.config({
  placement: 'topRight',
})

const notify = (props: Props) => {
  Notification.open({
    key: props.key,
    title: props.title,
    content: props.content,
    duration: props.duration,
    onClose: props.onClose,
  })
}

export default notify
