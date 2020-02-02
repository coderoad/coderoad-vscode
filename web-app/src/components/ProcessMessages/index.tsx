import Message from '../Message'
import * as React from 'react'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'

interface Props {
  testStatus: T.TestStatus | null
  processes: T.ProcessEvent[]
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
}

// display a list of active processes
const ProcessMessages = ({ processes, testStatus }: Props) => {
  if (testStatus) {
    return (
      <Message key={testStatus.title} type={testStatus.type} title={testStatus.title} size="medium">
        {testStatus.content}
      </Message>
    )
  }
  if (!processes.length) {
    return null
  }
  return (
    <div css={styles.container}>
      {processes.map(process => (
        <Message key={process.title} type="loading" size="medium" title={process.title}>
          {process.description}
        </Message>
      ))}
    </div>
  )
}

export default ProcessMessages
