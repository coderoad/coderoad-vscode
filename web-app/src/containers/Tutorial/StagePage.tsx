import * as React from 'react'
import DataContext from '../../utils/DataContext'
import Stage from '../../components/Stage'

interface PageProps {
  send(action: string): void
  state: any
}

const StagePage = (props: PageProps) => {
  const { position, data, progress } = React.useContext(DataContext)
  const { stageId } = position
  const stage = data.stages[stageId]

  const stageComplete = progress.stages[stageId] || false

  const onNextStage = (): void => {
    props.send('STAGE_NEXT')
  }

  // create step subset
  const steps: { [stepId: string]: any } = {}
  for (const stepId of stage.stepList) {
    steps[stepId] = {
      ...data.steps[stepId],
      status: {
        // flag progressed steps as complete
        complete: progress.stages[stageId] || false,
        // set active step to active
        active: position.stepId === stepId,
      },
    }
  }
  return <Stage stage={stage} steps={steps} onNextStage={onNextStage} complete={stageComplete} />
}

export default StagePage
