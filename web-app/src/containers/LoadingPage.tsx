import * as React from 'react'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import Loading from '../components/Loading'
import Message from '../components/Message'

interface Props {
  text: string
  context: T.MachineContext
}

const styles = {
  page: {
    position: 'relative' as 'relative',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
}

const LoadingPage = ({ text, context }: Props) => {
  const { error } = context
  if (error) {
    return (
      <div css={styles.page}>
        <Message type="error" title={error.title} content={error.description} />
      </div>
    )
  }
  return (
    <div css={styles.page}>
      <Loading text={text} />
    </div>
  )
}

export default LoadingPage
