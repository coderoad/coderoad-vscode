import * as React from 'react'
import * as T from 'typings'
import * as selectors from '../../services/selectors'
import SideMenu from './components/SideMenu'
import Level from './components/Level'
import Icon from '../../components/Icon'
import ReviewPage from './containers/Review'
import Button from '../../components/Button'
import ProcessMessages from '../../components/ProcessMessages'
import TestMessage from '../../components/TestMessage'
import StepProgress from './components/StepProgress'
import { DISPLAY_RUN_TEST_BUTTON } from '../../environment'
import formatLevels from './formatLevels'
import Reset from './components/Reset'
import Continue from './components/Continue'

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
    padding: '10px 0rem',
    position: 'fixed' as 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    color: 'white',
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
  state: string // 'Normal' | 'TestRunning' | 'TestFail' | 'TestPass' | 'LevelComplete'
}

/**
 * NOTE: Unused commands
 * { type: 'STEP_SOLUTION_LOAD' }
 * { type: 'OPEN_LOGS', payload: { channel } }
 */

const TutorialPage = (props: PageProps) => {
  const { position, progress, processes, testStatus } = props.context

  const tutorial = selectors.currentTutorial(props.context)

  const onContinue = (): void => {
    props.send({
      type: 'NEXT_LEVEL',
    })
  }

  const onRunTest = (): void => {
    props.send({ type: 'RUN_TEST' })
  }

  const onReset = (): void => {
    props.send({ type: 'RUN_RESET' })
  }

  const [menuVisible, setMenuVisible] = React.useState(false)

  const [page, setPage] = React.useState<'level' | 'settings' | 'review'>('level')

  // format level code with status for easy rendering
  const { level, levels, levelIndex, stepIndex } = formatLevels({
    progress,
    position,
    levels: tutorial.levels,
    testStatus,
  })

  const disableOptions = processes.length > 0 && props.state === 'TestRunning'

  return (
    <div>
      <div>
        <div css={styles.header}>
          <a onClick={() => setMenuVisible(!menuVisible)}>
            <Icon type="toggle-left" size="small" style={{ color: '#333' }} />
          </a>
          <span css={styles.title}>{tutorial.summary.title}</span>
        </div>

        {page === 'level' && <Level level={level} />}
        {page === 'review' && <ReviewPage levels={levels} />}
        {/* {page === 'settings' && <SettingsPage />} */}
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
        {/* Left */}
        <div css={{ flex: 1 }}>
          {DISPLAY_RUN_TEST_BUTTON && level.status !== 'COMPLETE' ? (
            <Button style={{ marginLeft: '1rem' }} type="primary" onClick={onRunTest} disabled={disableOptions}>
              Run
            </Button>
          ) : null}
        </div>

        {/* Center */}
        <div css={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Reset onReset={onReset} disabled={disableOptions || props.state === 'LevelComplete'} />
        </div>

        {/* Right */}
        <div css={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {!level.steps.length ? (
            <div css={{ marginRight: '0.5rem' }}>
              <Continue
                onContinue={onContinue}
                current={levelIndex + 1}
                max={levels.length}
                title={tutorial.summary.title}
                defaultOpen={false}
              />
            </div>
          ) : props.state === 'LevelComplete' ? (
            <div css={{ marginRight: '0.5rem' }}>
              <Continue
                onContinue={onContinue}
                current={levelIndex + 1}
                max={levels.length}
                title={tutorial.summary.title}
                defaultOpen={true}
              />
            </div>
          ) : level.steps.length > 1 ? (
            <StepProgress current={stepIndex + 1} max={level.steps.length} />
          ) : null}
        </div>
      </div>
      <SideMenu visible={menuVisible} toggleVisible={setMenuVisible} page={page} setPage={setPage} />
    </div>
  )
}

export default TutorialPage
