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
  onLevelSelect(levelId: string): void
}

const Summary = ({ data, onLevelSelect }: Props) => {
  const { summary, levels } = data
  return (
    <Card style={styles.card} title={summary.title} showTitleBullet={false} contentHeight="auto">
      <p>{summary.description}</p>
      <div>
        {data.summary.levelList.map((levelId: string, index: number) => {
          const level = levels[levelId]
          return (
            <div key={levelId}>
              <h3>
                {index + 1}. {level.content.title}
              </h3>
              <p>{level.content.text}</p>
              <Button onClick={() => onLevelSelect('level1Id')}>Continue</Button>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default Summary
