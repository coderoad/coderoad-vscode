import * as React from 'react'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import TestStatusIcon from './TestStatusIcon'
import Markdown from '../../../components/Markdown'

interface Props {
  order: number
  content: string
  status: T.ProgressStatus
  subtasks: { name: string; pass: boolean }[] | null
  onLoadSolution(): void
}

const styles = {
  card: {
    display: 'grid',
    gridTemplateColumns: '25px 1fr',
    padding: '1rem 1rem 1rem 0rem',
  },
  content: {
    margin: 0,
  },
  statusContainer: {
    paddingTop: 0,
    width: '1rem',
  },
  subtasks: {
    marginTop: '1rem',
  },
  subtask: {
    marginBottom: '1rem',
    display: 'flex',
  },
  options: {
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'flex-end',
    alignItems: 'center' as 'center',
    padding: '0.5rem',
  },
}

const Step = (props: Props) => {
  const showStep = props.status !== 'INCOMPLETE'
  if (!showStep) {
    return null
  }
  return (
    <div>
      <div css={styles.card}>
        <div css={styles.statusContainer}>
          {props.status === 'ACTIVE' && <TestStatusIcon size="small" checked />}
          {props.status === 'COMPLETE' && <TestStatusIcon size="small" />}
        </div>
        <div>
          <div css={styles.content}>
            <Markdown>{props.content || ''}</Markdown>
          </div>
          {props.subtasks ? (
            <ul css={styles.subtasks}>
              {props.subtasks.map((subtask) => (
                <li key={subtask.name} css={styles.subtask}>
                  <TestStatusIcon size="xs" checked={subtask.pass} />

                  <span style={{ marginLeft: '0.5rem' }}>{subtask.name}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Step
