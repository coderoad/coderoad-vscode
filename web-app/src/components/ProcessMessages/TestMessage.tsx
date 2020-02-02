import Message from '../Message'
import * as React from 'react'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'

const durations = {
  success: 1000,
  warning: 4500,
  error: 4500,
  loading: Infinity,
}

const useTimeout = ({ duration, key }: { duration: number; key: string }) => {
  const [timeoutClose, setTimeoutClose] = React.useState(false)
  React.useEffect(() => {
    setTimeoutClose(false)
    const timeout = setTimeout(() => {
      setTimeoutClose(true)
    }, duration)
    return () => {
      clearTimeout(timeout)
    }
  }, [key])
  return timeoutClose
}

const TestMessage = (props: T.TestStatus) => {
  const duration = durations[props.type]
  const timeoutClose = useTimeout({ duration, key: props.title })
  return (
    <Message
      key={props.title}
      type={props.type}
      title={props.title}
      closed={timeoutClose}
      size="medium"
      closeable={props.type !== 'loading'}
      content={props.content}
    />
  )
}

export default TestMessage
