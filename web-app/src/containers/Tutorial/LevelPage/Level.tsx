import * as React from 'react'
import * as T from 'typings'
import * as G from 'typings/graphql'
import { css, jsx } from '@emotion/core'
import Button from '../../../components/Button'
import Markdown from '../../../components/Markdown'
import ProcessMessages from '../../../components/ProcessMessages'
import Step from './Step'

const styles = {
  page: {
    backgroundColor: 'white',
    position: 'relative' as 'relative',
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    padding: 0,
    paddingBottom: '4.5rem',
    height: 'auto',
    width: '100%',
  },
  header: {
    height: '2rem',
    backgroundColor: '#EBEBEB',
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 1rem',
  },
  content: {
    padding: '0rem 1rem',
    paddingBottom: '1rem',
  },
  tasks: {
    paddingBottom: '5rem',
  },
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
  if (!level.steps) {
    throw new Error('No Stage steps found')
  }

  const pageBottomRef = React.useRef(null)

  const scrollToBottom = () => {
    // @ts-ignore
    pageBottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  // @ts-ignore
  const currentStep = level.steps.findIndex(s => s.status === 'ACTIVE')
  React.useEffect(scrollToBottom, [currentStep])

  return (
    <div css={styles.page}>
      <div css={styles.header}>
        <span>Learn</span>
      </div>
      <div css={styles.content}>
        <h2 css={styles.title}>{level.title}</h2>
        <Markdown>{level.content || ''}</Markdown>
      </div>

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
        <div ref={pageBottomRef} />
      </div>

      {(testStatus || processes.length > 0) && (
        <div css={styles.processes}>
          <ProcessMessages processes={processes} testStatus={testStatus} />
        </div>
      )}

      <div css={styles.footer}>
        <span>
          {typeof level.index === 'number' ? `${level.index + 1}. ` : ''}
          {level.title}
        </span>
        <span>
          {level.status === 'COMPLETE' ? (
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
  )
}

export default Level
