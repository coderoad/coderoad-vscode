import { Message as AlifdMessage } from '@alifd/next'
import * as React from 'react'
import * as T from 'typings'

interface Props {
  processes: T.ProcessEvent[]
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
}

// display a list of active processes
const ProcessEvents = ({ processes }: Props) => {
  if (!processes.length) {
    return null
  }
  return (
    <div style={styles.container}>
      {processes.map(process => (
        <AlifdMessage key={process.title} type="loading" size="medium" title={process.title}>
          {process.description}
        </AlifdMessage>
      ))}
    </div>
  )
}

export default ProcessEvents
