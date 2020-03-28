import * as React from 'react'
import * as T from 'typings'
import * as G from 'typings/graphql'
import { css, jsx } from '@emotion/core'
import Button from '../../../components/Button'
import Markdown from '../../../components/Markdown'
import ProcessMessages from '../../../components/ProcessMessages'
import NuxTutorial from '../../../components/NewUserExperience/NuxTutorial'
import Step from './Step'

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
    height: '2rem',
    backgroundColor: '#EBEBEB',
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 1rem',
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
  level: G.Level & { status: T.ProgressStatus; index: number; steps: Array<G.Step & { status: T.ProgressStatus }> }
  processes: T.ProcessEvent[]
  testStatus: T.TestStatus | null
  onContinue(): void
  onLoadSolution(): void
}

const Level = ({ level, onContinue, onLoadSolution, processes, testStatus }: Props) => {
  // @ts-ignore
  let currentStep = level.steps.findIndex((s) => s.status === 'ACTIVE')
  if (currentStep === -1) {
    currentStep = level.steps.length
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
          <span>Learn</span>
        </div>
        <div css={styles.text}>
          <h2 css={styles.title}>{level.title}</h2>
          <Markdown>{level.content || ''}</Markdown>
        </div>

        {level.steps.length ? (
          <div css={styles.tasks}>
            <div css={styles.header}>Tasks</div>
            <div css={styles.steps}>
              {level.steps.map((step: (G.Step & { status: T.ProgressStatus }) | null, index: number) => {
                if (!step) {
                  return null
                }
                return (
                  <Step
                    key={step.id}
                    order={index + 1}
                    status={step.status}
                    content={step.content}
                    onLoadSolution={onLoadSolution}
                  />
                )
              })}
            </div>
          </div>
        ) : null}

        <div ref={pageBottomRef} />

        {(testStatus || processes.length > 0) && (
          <div css={styles.processes}>
            <ProcessMessages processes={processes} testStatus={testStatus} />
          </div>
        )}

        <div css={styles.nux}>
          <NuxTutorial onLoadSolution={onLoadSolution} />
        </div>

        <div css={styles.footer}>
          <span>
            {typeof level.index === 'number' ? `${level.index + 1}. ` : ''}
            {level.title}
          </span>
          <span>
            {level.status === 'COMPLETE' || !level.steps.length ? (
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
      </div>
    </div>
  )
}

export default Level
