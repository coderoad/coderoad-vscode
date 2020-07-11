import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as selectors from '../../services/selectors'
import SideMenu from './components/SideMenu'
import Level from './components/Level'
import Icon from '../../components/Icon'
import SettingsPage from './containers/Settings'
import ReviewPage from './containers/Review'
import Button from '../../components/Button'
import ProcessMessages from '../../components/ProcessMessages'
import TestMessage from '../../components/TestMessage'
import { DISPLAY_RUN_TEST_BUTTON } from '../../environment'

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
  footer: {
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '2rem',
    backgroundColor: 'black',
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 1rem',
    position: 'fixed' as 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    color: 'white',
  },
  taskCount: {
    fontSize: '0.8rem',
    opacity: 0.9,
  },
  processes: {
    padding: '0 1rem',
    position: 'fixed' as 'fixed',
    bottom: '2rem',
    left: 0,
    right: 0,
    top: 'auto',
  },
  testMessage: {
    position: 'absolute' as 'absolute',
    top: 'auto',
    bottom: '2rem',
    left: '5px',
    right: '5px',
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
  const level: TT.Level = tutorial.levels[levelIndex]
  const [menuVisible, setMenuVisible] = React.useState(false)

  const [page, setPage] = React.useState<'level' | 'settings' | 'review'>('level')

  let currentStep = level.steps.findIndex((s: TT.Step) => s.status === 'ACTIVE')
  if (currentStep === -1) {
    currentStep = level.steps.length
  }

  return (
    <div>
      <div>
        <div css={styles.header}>
          <a onClick={() => setMenuVisible(!menuVisible)}>
            <Icon type="toggle-left" size="small" />
          </a>
          <span css={styles.title}>{tutorial.summary.title}</span>
        </div>

        {page === 'level' && (
          <Level
            level={level}
            currentStep={currentStep}
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
        )}
        {page === 'settings' && <SettingsPage />}
        {page === 'review' && <ReviewPage />}
      </div>
      <div css={styles.footer}>
        {/* Process Modal */}
        {processes.length > 0 && (
          <div css={styles.processes}>
            <ProcessMessages processes={processes} />
          </div>
        )}
        {/* Test Fail Modal */}
        {testStatus && testStatus.type === 'warning' && (
          <div css={styles.testMessage}>
            <TestMessage message={testStatus.title} />
          </div>
        )}

        {DISPLAY_RUN_TEST_BUTTON && levelStatus !== 'COMPLETE' ? (
          <Button type="primary" onClick={onRunTest} disabled={processes.length > 0}>
            Run
          </Button>
        ) : null}
        <span>
          {levelStatus === 'COMPLETE' || !level.steps.length ? (
            <Button type="primary" onClick={onContinue}>
              Continue
            </Button>
          ) : (
            <span css={styles.taskCount}>
              {currentStep} of {level.steps.length} tasks
            </span>
          )}
        </span>
      </div>
      <SideMenu visible={menuVisible} toggleVisible={setMenuVisible} page={page} setPage={setPage} />
    </div>
  )
}

export default TutorialPage
