import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as selectors from '../../services/selectors'
import Level from './components/Level'

interface PageProps {
  context: T.MachineContext
  send(action: T.Action): void
}

const TutorialPage = (props: PageProps) => {
  const { position, progress, processes, testStatus } = props.context

  const tutorial = selectors.currentTutorial(props.context)

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

  const onRunTest = (): void => {
    props.send({ type: 'RUN_TEST' })
  }

  const onOpenLogs = (channel: string): void => {
    props.send({ type: 'OPEN_LOGS', payload: { channel } })
  }

  const levelIndex = tutorial.levels.findIndex((l: TT.Level) => l.id === position.levelId)
  const levelStatus = progress.levels[position.levelId] ? 'COMPLETE' : 'ACTIVE'

  return (
    <Level
      tutorial={tutorial}
      index={levelIndex}
      status={levelStatus}
      progress={progress}
      position={position}
      onContinue={onContinue}
      onRunTest={onRunTest}
      onLoadSolution={onLoadSolution}
      onOpenLogs={onOpenLogs}
      processes={processes}
      testStatus={testStatus}
    />
  )
}

export default TutorialPage
