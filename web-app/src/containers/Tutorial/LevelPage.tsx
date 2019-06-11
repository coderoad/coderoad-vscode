import * as React from 'react'
import DataContext from '../../utils/DataContext'
import Level from '../../components/Level'

interface LevelProps {
  send(action: string): void
  state: any
}

const LevelPage = (props: LevelProps) => {
  const { position, data, progress } = React.useContext(DataContext)
  const { levelId } = position
  const level = data.levels[levelId]
  const onNext = (): void => {
    props.send('NEXT')
  }
  const onBack = (): void => {
    props.send('BACK')
  }

  const stages: { [stageId: string]: any } = {}
  for (const stageId of level.stageList) {
    stages[stageId] = {
      ...data.stages[stageId],
      status: {
        complete: progress.stages[stageId] || false,
        active: position.stageId === stageId,
      },
    }
  }

  return <Level level={level} stages={stages} onNext={onNext} onBack={onBack} />
}

export default LevelPage
