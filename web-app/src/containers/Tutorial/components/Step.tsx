import * as React from 'react'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import TestStatusIcon from './TestStatusIcon'
import Hints from './Hints'
import Markdown from '../../../components/Markdown'

interface Props {
  index: number
  content: string
  status: T.ProgressStatus
  subtasks: { name: string; pass: boolean }[] | null
  hints?: string[]
  hintIndex: number
  setHintIndex(value: number): void
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
          {props.status === 'ACTIVE' && <TestStatusIcon size="small" />}
          {props.status === 'COMPLETE' && <TestStatusIcon size="small" checked />}
        </div>
        <div>
          {/* content */}
          <div css={styles.content}>
            <Markdown>{props.content || ''}</Markdown>
          </div>
          {/* subtasks */}
          {props.subtasks ? (
            <ul css={styles.subtasks}>
              {props.subtasks.map((subtask) => (
                <li key={subtask.name} css={styles.subtask}>
                  <TestStatusIcon size="xs" checked={props.status === 'COMPLETE' || subtask.pass} />

                  <span style={{ marginLeft: '0.5rem' }}>{subtask.name}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {/* hints */}
          {props.hints && props.hints.length ? (
            <Hints hints={props.hints} hintIndex={props.hintIndex} setHintIndex={props.setHintIndex} />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Step
