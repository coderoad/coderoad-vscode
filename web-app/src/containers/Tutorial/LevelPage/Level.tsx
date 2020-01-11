import * as React from 'react'
import * as T from 'typings'
import * as G from 'typings/graphql'
import { css, jsx } from '@emotion/core'
import Button from '../../../components/Button'
import Markdown from '../../../components/Markdown'
import ProcessEvents from '../../../components/ProcessEvents'
import Step from './Step'

const styles = {
  page: {
    backgroundColor: 'white',
    position: 'relative' as 'relative',
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    padding: 0,
    paddingBottom: '36px',
    height: 'auto',
    width: '100%',
  },
  header: {
    height: '36px',
    backgroundColor: '#EBEBEB',
    fontSize: '16px',
    lineHeight: '16px',
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
    padding: '1rem 16px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold' as 'bold',
    lineHeight: '1.2rem',
  },
  processes: {
    padding: '0 1rem',
    position: 'absolute' as 'absolute',
    bottom: '36px',
  },
  footer: {
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '36px',
    backgroundColor: 'black',
    fontSize: '16px',
    lineHeight: '16px',
    padding: '10px 1rem',
    position: 'fixed' as 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    color: 'white',
  },
}

interface Props {
  level: G.Level & { status: T.ProgressStatus; index: number; steps: Array<G.Step & { status: T.ProgressStatus }> }
  processes: T.ProcessEvent[]
  onContinue(): void
  onLoadSolution(): void
}

const Level = ({ level, onContinue, onLoadSolution, processes }: Props) => {
  if (!level.steps) {
    throw new Error('No Stage steps found')
  }

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
      </div>

      {processes.length > 0 && (
        <div css={styles.processes}>
          <ProcessEvents processes={processes} />
        </div>
      )}

      <div css={styles.footer}>
        <span>
          {typeof level.index === 'number' ? `${level.index + 1}. ` : ''}
          {level.title}
        </span>
        <span>
          {level.status === 'COMPLETE' && (
            <Button type="primary" onClick={onContinue}>
              Continue
            </Button>
          )}
        </span>
      </div>
    </div>
  )
}

export default Level
