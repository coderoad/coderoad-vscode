import * as React from 'react'
import * as T from 'typings'
import * as selectors from '../../services/selectors'
import SideMenu from './components/SideMenu'
import Level from './components/Level'
import Icon from '../../components/Icon'
import AboutPage from './containers/About'
import ReviewPage from './containers/Review'
import Button from '../../components/Button'
import ProcessMessages from '../../components/ProcessMessages'
import TestMessage from '../../components/TestMessage'
import StepProgress from './components/StepProgress'
import { DISPLAY_RUN_TEST_BUTTON } from '../../environment'
import formatLevels from './formatLevels'
import Reset from './components/Reset'
import Continue from './components/Continue'
import ScrollContent from './components/ScrollContent'
import CompletedBanner from './components/CompletedBanner'
import { Theme } from '../../styles/theme'
import { useTheme } from 'emotion-theming'

const styles = {
  page: {
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    paddingBottom: '5rem',
  },
  header: (theme: Theme) => ({
    display: 'flex' as 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '2rem',
    backgroundColor: theme['$color-fill1-4'],
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 0.4rem',
  }),
  menuIcon: (theme: Theme) => ({
    color: theme['$color-text1-4'],
  }),
  title: {
    marginLeft: '0.5rem',
  },
  learn: {
    textDecoration: 'none',
    color: 'inherit',
  },
  footer: (theme: Theme) => ({
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: theme['$footer-height'],
    backgroundColor: 'black',
    fontSize: '12px',
    lineHeight: '16px',
    padding: '10px 0rem',
    position: 'fixed' as 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    color: theme['$color-white'],
    zIndex: 1000,
  }),
  completeFooter: {
    position: 'fixed' as 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  processes: (theme: Theme) => ({
    padding: '0 1rem',
    position: 'fixed' as 'fixed',
    bottom: theme['$footer-height'],
    left: 0,
    right: 0,
    top: 'auto',
  }),
  testMessage: (theme: Theme) => ({
    position: 'fixed' as 'fixed',
    top: 'auto',
    bottom: theme['$footer-height'],
    left: '5px',
    right: '5px',
  }),
}

interface PageProps {
  context: T.MachineContext
  send(action: T.Action): void
  state: string // 'Normal' | 'TestRunning' | 'Level.LevelComplete'
}

/**
 * NOTE: Unused commands
 * { type: 'STEP_SOLUTION_LOAD' }
 * { type: 'OPEN_LOGS', payload: { channel } }
 */

const TutorialPage = (props: PageProps) => {
  const theme: Theme = useTheme()
  const { position, processes, testStatus } = props.context

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

  const onResetToPosition = (position: T.Position): void => {
    props.send({ type: 'RUN_RESET_TO_POSITION', payload: { position } })
  }

  const [menuVisible, setMenuVisible] = React.useState(false)

  const [page, setPage] = React.useState<'about' | 'level' | 'review' | 'settings'>('level')

  // format level code with status for easy rendering
  const { level, levels, levelIndex, stepIndex } = formatLevels({
    position,
    levels: tutorial.levels,
    testStatus,
  })

  const disableOptions = processes.length > 0 || props.state === 'Level.TestRunning'

  return (
    <div>
      <div css={styles.page}>
        <div css={styles.header}>
          <a onClick={() => setMenuVisible(!menuVisible)}>
            <Icon type="toggle-left" size="small" style={styles.menuIcon(theme)} />
          </a>
          <span css={styles.title}>{tutorial.summary.title}</span>
        </div>

        {page === 'about' && <AboutPage />}

        {page === 'level' && (
          <ScrollContent item={level.id}>
            <Level level={level} />
          </ScrollContent>
        )}
        {page === 'review' && <ReviewPage levels={levels} onResetToPosition={onResetToPosition} />}

        {/* {page === 'settings' && <SettingsPage />} */}
      </div>

      {props.state === 'Completed' ? (
        <div css={styles.completeFooter}>
          <CompletedBanner
            title={tutorial.summary.title || 'Unknown'}
            onRequestWorkspace={() => props.send({ type: 'REQUEST_WORKSPACE' })}
          />
        </div>
      ) : (
        <footer css={styles.footer}>
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
            {DISPLAY_RUN_TEST_BUTTON && level.steps.length && level.status !== 'COMPLETE' ? (
              <Button
                style={{ marginLeft: '1rem', width: '57px' }}
                type="primary"
                onClick={onRunTest}
                disabled={disableOptions}
              >
                {props.state === 'Level.TestRunning' ? <Icon type="loading" size="small" /> : 'Run'}
              </Button>
            ) : null}
          </div>

          {/* Center */}
          <div css={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Reset onReset={onReset} disabled={disableOptions || props.state === 'Level.LevelComplete'} />
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
            ) : props.state === 'Level.LevelComplete' ? (
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
        </footer>
      )}
      <SideMenu visible={menuVisible} toggleVisible={setMenuVisible} page={page} setPage={setPage} />
    </div>
  )
}

export default TutorialPage
