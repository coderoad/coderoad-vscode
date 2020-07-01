import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import { css, jsx } from '@emotion/core'
import { Dropdown } from '@alifd/next'
import Icon from '../../../components/Icon'
import Button from '../../../components/Button'
import Markdown from '../../../components/Markdown'
import ProcessMessages from '../../../components/ProcessMessages'
import NuxTutorial from '../../../components/NewUserExperience/NuxTutorial'
import ContentMenu from './ContentMenu'
import Step from './Step'
import { DISPLAY_RUN_TEST_BUTTON } from '../../../environment'

const styles = {
  page: {
    backgroundColor: 'white',
    position: 'relative' as 'relative',
    height: 'auto',
    width: '100%',
  },
  content: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    padding: 0,
    paddingBottom: '5rem',
  },
  header: {
    display: 'flex' as 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '2rem',
    backgroundColor: '#EBEBEB',
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 1rem',
  },
  learn: {
    textDecoration: 'none',
    color: 'inherit',
  },
  text: {
    padding: '0rem 1rem',
    paddingBottom: '1rem',
  },
  tasks: {},
  steps: {
    padding: '1rem 1rem',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold' as 'bold',
    lineHeight: '1.2rem',
  },
  processes: {
    padding: '0 1rem',
    position: 'fixed' as 'fixed',
    bottom: '4rem',
    left: 0,
    right: 0,
  },
  nux: {
    position: 'fixed' as 'fixed',
    bottom: '2rem',
    left: 0,
    right: 0,
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
}

interface Props {
  tutorial: TT.Tutorial
  index: number
  status: 'COMPLETE' | 'ACTIVE' | 'INCOMPLETE'
  progress: T.Progress
  position: T.Position
  processes: T.ProcessEvent[]
  testStatus: T.TestStatus | null
  onContinue(): void
  onRunTest(): void
  onLoadSolution(): void
  onOpenLogs(channel: string): void
}

const Level = ({
  tutorial,
  index,
  status,
  progress,
  position,
  onContinue,
  onRunTest,
  onLoadSolution,
  onOpenLogs,
  processes,
  testStatus,
}: Props) => {
  const level = tutorial.levels[index]

  const [title, setTitle] = React.useState<string>(level.title)
  const [content, setContent] = React.useState<string>(level.content)

  // hold state for hints for the level
  const [displayHintsIndex, setDisplayHintsIndex] = React.useState<number[]>([])
  const setHintsIndex = (index: number, value: number) => {
    return setDisplayHintsIndex((displayHintsIndex) => {
      const next = [...displayHintsIndex]
      next[index] = value
      return next
    })
  }
  React.useEffect(() => {
    // set the hints to empty on level starts
    setDisplayHintsIndex(steps.map((s) => -1))
  }, [position.levelId])

  const menu = (
    <ContentMenu
      tutorial={tutorial}
      position={position}
      progress={progress}
      setTitle={setTitle}
      setContent={setContent}
    />
  )

  const steps: Array<TT.Step & { status: T.ProgressStatus }> = level.steps.map((step: TT.Step) => {
    // label step status for step component
    let status: T.ProgressStatus = 'INCOMPLETE'
    if (progress.steps[step.id]) {
      status = 'COMPLETE'
    } else if (step.id === position.stepId) {
      status = 'ACTIVE'
    }
    return { ...step, status }
  })

  // current
  let currentStep = steps.findIndex((s) => s.status === 'ACTIVE')
  if (currentStep === -1) {
    currentStep = steps.length
  }

  const pageBottomRef = React.useRef(null)
  const scrollToBottom = () => {
    // @ts-ignore
    pageBottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  React.useEffect(scrollToBottom, [currentStep])

  return (
    <div css={styles.page}>
      <div css={styles.content}>
        <div css={styles.header}>
          <Dropdown
            trigger={
              <a css={styles.learn}>
                Learn <Icon type="arrow-down" size="xxs" />
              </a>
            }
            triggerType="click"
          >
            {menu}
          </Dropdown>
        </div>

        <div css={styles.text}>
          <h2 css={styles.title}>{title}</h2>
          <Markdown>{content || ''}</Markdown>
        </div>

        {steps.length ? (
          <div css={styles.tasks}>
            <div css={styles.header}>Tasks</div>
            <div css={styles.steps}>
              {steps.map((step: (TT.Step & { status: T.ProgressStatus }) | null, stepIndex: number) => {
                if (!step) {
                  return null
                }
                let subtasks = null
                if (step?.setup?.subtasks && testStatus?.summary) {
                  subtasks = Object.keys(testStatus.summary).map((testName: string) => ({
                    name: testName,
                    // @ts-ignore typescript is wrong here
                    pass: testStatus.summary[testName],
                  }))
                }
                const hints = step.hints
                return (
                  <Step
                    key={step.id}
                    index={index}
                    status={step.status}
                    content={step.content}
                    onLoadSolution={onLoadSolution}
                    subtasks={subtasks}
                    hints={step.hints}
                    hintIndex={displayHintsIndex[stepIndex]}
                    setHintIndex={(value) => setHintsIndex(stepIndex, value)}
                  />
                )
              })}
            </div>
          </div>
        ) : null}

        <div ref={pageBottomRef} />

        {((testStatus && testStatus.type !== 'hidden') || processes.length > 0) && (
          <div css={styles.processes}>
            <ProcessMessages processes={processes} testStatus={testStatus} onOpenLogs={onOpenLogs} />
          </div>
        )}

        <div css={styles.nux}>
          <NuxTutorial onLoadSolution={onLoadSolution} />
        </div>

        <div css={styles.footer}>
          {DISPLAY_RUN_TEST_BUTTON && status !== 'COMPLETE' ? (
            <Button type="primary" onClick={onRunTest} disabled={processes.length > 0}>
              Run
            </Button>
          ) : (
            <span>
              {typeof index === 'number' ? `${index + 1}. ` : ''}
              {title}
            </span>
          )}
          <span>
            {status === 'COMPLETE' || !steps.length ? (
              <Button type="primary" onClick={onContinue}>
                Continue
              </Button>
            ) : (
              <span css={styles.taskCount}>
                {currentStep} of {steps.length} tasks
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Level
