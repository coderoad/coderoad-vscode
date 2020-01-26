import * as React from 'react'
import { css, jsx } from '@emotion/core'
import Loading from '../components/Loading'
import Message from '../components/Message'

interface Props {
  text: string
  context: any
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
        <Message type="error" title={error.title} description={error.description} />
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
