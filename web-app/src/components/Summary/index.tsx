import { Button, Card } from '@alifd/next'
import * as React from 'react'
import CR from 'typings'

const styles = {
  card: {
    // width: '20rem',
  },
  content: {
    padding: '0rem 1rem',
  },
  options: {
    padding: '1rem',
  },
  title: {},
}

interface Props {
  data: CR.TutorialData
  onNext(): void
}

const Summary = ({ data, onNext }: Props) => {
  const { summary } = data
  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <h2 style={styles.title}>{summary.title}</h2>
        <p>{summary.description}</p>
      </div>
      <div style={styles.options}>
        <Button onClick={() => onNext()}>Continue</Button>
      </div>
    </div>
  )
}

export default Summary
