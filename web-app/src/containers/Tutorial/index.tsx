import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as selectors from '../../services/selectors'
import ContentMenu from './ContentMenu'
import Level from './components/Level'

interface PageProps {
  context: T.MachineContext
  send(action: T.Action): void
}

const TutorialPage = (props: PageProps) => {
  const { position, progress, processes, testStatus } = props.context

  const tutorial = selectors.currentTutorial(props.context)
  const levelData: TT.Level = selectors.currentLevel(props.context)

  const [title, setTitle] = React.useState<string>(levelData.title)
  const [content, setContent] = React.useState<string>(levelData.content)

  const onContinue = (): void => {
    props.send({
      type: 'NEXT_LEVEL',
      payload: {
        levelId: position.levelId,
      },
    })
  }

  const onLoadSolution = (): void => {
    props.send({ type: 'STEP_SOLUTION_LOAD' })
  }

  const steps = levelData.steps.map((step: TT.Step) => {
    // label step status for step component
    let status: T.ProgressStatus = 'INCOMPLETE'
    if (progress.steps[step.id]) {
      status = 'COMPLETE'
    } else if (step.id === position.stepId) {
      status = 'ACTIVE'
    }
    return { ...step, status }
  })

  return (
    <Level
      title={title}
      content={content}
      menu={
        <ContentMenu
          tutorial={tutorial}
          position={position}
          progress={progress}
          setTitle={setTitle}
          setContent={setContent}
        />
      }
      index={tutorial.levels.findIndex((l: TT.Level) => l.id === position.levelId)}
      steps={steps}
      status={progress.levels[position.levelId] ? 'COMPLETE' : 'ACTIVE'}
      onContinue={onContinue}
      onLoadSolution={onLoadSolution}
      processes={processes}
      testStatus={testStatus}
    />
  )
}

export default TutorialPage
