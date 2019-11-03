import { Button } from '@alifd/next'
import * as React from 'react'
import * as G from 'typings/graphql'
import * as T from 'typings'

import Step from './Step'
import Markdown from '../../../../components/Markdown'

const styles = {
  card: {
    padding: 0,
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
  options: {
    padding: '0rem 1rem',
  },
  steps: {
    padding: '1rem 16px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold' as 'bold',
    lineHeight: '1.2rem',
  },
  footer: {
    height: '36px',
    backgroundColor: 'black',
    fontSize: '16px',
    lineHeight: '16px',
    padding: '10px 1rem',
    color: 'white',
    position: 'absolute' as 'absolute',
    bottom: 0,
    width: '100%',
  },
}

interface Props {
  level: G.Level & { status: T.ProgressStatus; index: number; steps: Array<G.Step & { status: T.ProgressStatus }> }
  onContinue(): void
  onLoadSolution(): void
}

const Level = ({ level, onContinue, onLoadSolution }: Props) => {
  if (!level.steps) {
    throw new Error('No Stage steps found')
  }

  return (
    <div style={styles.card}>
      <div>
        <div style={styles.header}>
          <span>Learn</span>
        </div>
        <div style={styles.content}>
          <h2 style={styles.title}>{level.title}</h2>
          <Markdown>{level.content || ''}</Markdown>
        </div>
      </div>

      <div>
        <div style={styles.header}>Tasks</div>
        <div style={styles.steps}>
          {level.steps.map((step: G.Step & { status: T.ProgressStatus } | null, index: number) => {
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

      {level.status === 'COMPLETE' && (
        <div style={styles.options}>
          <Button onClick={onContinue}>Continue</Button>
        </div>
      )}
      <div>
        <div style={styles.footer}>
          <span>
            {level.index ? `${level.index.toString()}.` : ''} {level.title}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Level
