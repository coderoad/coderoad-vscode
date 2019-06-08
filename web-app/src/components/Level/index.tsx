import * as React from 'react'
import { Button, Card } from '@alifd/next'
import CR from '../../../../src/typings'

const styles = {
  card: {
    // width: '20rem',
  },
  disabled: {
    backgroundColor: 'grey',
  },
}

interface Props {
  level: CR.TutorialLevel
  onStageSelect(stageId: string): void
  onBack(): void
  stages: {
    [stageId: string]: any // CC.StageWithStatus
  }
}

const Level = ({ level, stages, onStageSelect, onBack }: Props) => {
  const { title, text } = level.content
  return (
    <Card style={styles.card} title={title} showTitleBullet={false} contentHeight="auto">
      <p>{text}</p>
      <div>
        {level.stageList.map((stageId: string) => {
          const stage = stages[stageId]
          const unavailable = !stage.status.complete && !stage.status.active
          return (
            <div key={stageId} style={unavailable ? styles.disabled : {}}>
              <h3>{stage.content.title}</h3>
              <p>{stage.content.text}</p>
              {stage.status.active && <Button onClick={() => onStageSelect(stageId)}>Continue</Button>}
              {stage.status.complete && <div>Complete</div>}
            </div>
          )
        })}
      </div>
      <Button onClick={onBack}>Back</Button>
    </Card>
  )
}

export default Level
