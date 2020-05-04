import Message from '../Message'
import * as React from 'react'
import * as T from 'typings'
import Button from '../Button'
import { css, jsx } from '@emotion/core'
import TestMessage from './TestMessage'

interface Props {
  testStatus?: T.TestStatus | null
  processes: T.ProcessEvent[]
  onOpenLogs?: (channel: string) => void
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
}

// display a list of active processes
const ProcessMessages = ({ processes, testStatus, onOpenLogs }: Props) => {
  if (testStatus) {
    return (
      <TestMessage {...testStatus}>
        {testStatus.type === 'warning' ? (
          <Button
            onClick={() => onOpenLogs && onOpenLogs('CodeRoad (Tests)')}
            type="normal"
            style={{ marginTop: '0.8rem' }}
          >
            Open Logs
          </Button>
        ) : null}
      </TestMessage>
    )
  }
  if (!processes.length) {
    return null
  }
  return (
    <div css={styles.container}>
      {processes.map((process) => (
        <Message key={process.title} type="loading" size="medium" title={process.title} content={process.description} />
      ))}
    </div>
  )
}

export default ProcessMessages
