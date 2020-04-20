import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import { Menu } from '@alifd/next'
import * as selectors from '../../services/selectors'
import Icon from '../../components/Icon'
import Level from './components/Level'
import logger from 'services/logger'

interface PageProps {
  context: T.MachineContext
  send(action: T.Action): void
}

const TutorialPage = (props: PageProps) => {
  const { position, progress, processes, testStatus } = props.context

  const tutorial = selectors.currentTutorial(props.context)
  const levelData: TT.Level = selectors.currentLevel(props.context)

  const onContinue = (): void => {
    props.send({
      type: 'LEVEL_NEXT',
      payload: {
        LevelId: position.levelId,
      },
    })
  }

  const onLoadSolution = (): void => {
    props.send({ type: 'STEP_SOLUTION_LOAD' })
  }

  const level: TT.Level & {
    status: T.ProgressStatus
    index: number
    steps: Array<TT.Step & { status: T.ProgressStatus }>
  } = {
    ...levelData,
    index: tutorial.levels.findIndex((l: TT.Level) => l.id === position.levelId),
    status: progress.levels[position.levelId] ? 'COMPLETE' : 'ACTIVE',
    steps: levelData.steps.map((step: TT.Step) => {
      // label step status for step component
      let status: T.ProgressStatus = 'INCOMPLETE'
      if (progress.steps[step.id]) {
        status = 'COMPLETE'
      } else if (step.id === position.stepId) {
        status = 'ACTIVE'
      }
      return { ...step, status }
    }),
  }

  const menu = (
    <Menu>
      {tutorial.levels.map((level: TT.Level) => {
        const isCurrent = level.id === position.levelId
        logger('progress', progress)
        const isComplete = progress.levels[level.id]
        let icon
        let disabled = false

        if (isComplete) {
          icon = <Icon type="success" size="xs" />
        } else if (isCurrent) {
          icon = <Icon type="eye" size="xs" />
        } else {
          disabled = true
          icon = <Icon type="minus" size="xs" />
        }
        return (
          <Menu.Item key={level.id} disabled={disabled}>
            {icon}&nbsp;&nbsp;&nbsp;{level.title}
          </Menu.Item>
        )
      })}
    </Menu>
  )

  return (
    <Level
      menu={menu}
      level={level}
      onContinue={onContinue}
      onLoadSolution={onLoadSolution}
      processes={processes}
      testStatus={testStatus}
    />
  )
}

export default TutorialPage
