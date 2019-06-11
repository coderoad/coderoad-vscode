import * as React from 'react'
import { Button, Card } from '@alifd/next'
import CR from 'typings'

const styles = {
  card: {
    // width: '20rem',
  },
}

interface Props {
  data: CR.TutorialData
  onNext(): void
}

const Summary = ({ data, onNext }: Props) => {
  const { summary } = data
  return (
    <Card style={styles.card} title={summary.title} showTitleBullet={false} contentHeight="auto">
      <p>{summary.description}</p>
      <Button onClick={() => onNext()}>Continue</Button>
    </Card>
  )
}

export default Summary
