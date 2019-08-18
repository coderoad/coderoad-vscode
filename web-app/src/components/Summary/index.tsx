import { Button } from '@alifd/next'
import * as React from 'react'

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
  title: string
  text: string
  onNext(): void
}

const Summary = ({ title, text, onNext }: Props) => (
  <div style={styles.card}>
    <div style={styles.content}>
      <h2 style={styles.title}>{title}</h2>
      <p>{text}</p>
    </div>
    <div style={styles.options}>
      <Button onClick={() => onNext()}>Continue</Button>
    </div>
  </div>
)

export default Summary
