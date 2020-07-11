import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import { Drawer } from '@alifd/next'
import * as selectors from '../../services/selectors'
import Level from './components/Level'
import Icon from '../../components/Icon'

const styles = {
  header: {
    display: 'flex' as 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '2rem',
    backgroundColor: '#EBEBEB',
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 0.4rem',
  },
  title: {
    marginLeft: '0.5rem',
  },
  learn: {
    textDecoration: 'none',
    color: 'inherit',
  },
}

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
  const [menuVisible, setMenuVisible] = React.useState(false)

  const onMenuClose = () => {
    setMenuVisible(false)
  }

  return (
    <div>
      <div css={styles.header}>
        <a onClick={() => setMenuVisible(!menuVisible)}>
          <Icon type="toggle-left" size="small" />
        </a>
        <span css={styles.title}>{tutorial.summary.title}</span>
      </div>
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
      <Drawer title="Menu Title" visible={menuVisible} placement="left" onClose={onMenuClose}>
        Menu content here
      </Drawer>
    </div>
  )
}

export default TutorialPage
