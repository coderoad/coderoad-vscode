import * as React from 'react'
import { Message } from '@alifd/next'

interface Props {
  title: string
  description: string
}

const styles = {
  fail: {
    margin: '1rem',
  },
}

const TestFail = (props: Props) => (
  <Message css={styles.fail} key="fail" title={props.title} type="error" size="large" closeable>
    <p>{props.description}</p>
  </Message>
)

export default TestFail
