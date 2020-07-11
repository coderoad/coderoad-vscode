import * as React from 'react'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import TestStatusIcon from './TestStatusIcon'
import Markdown from '../../../components/Markdown'

interface Props {
  content: string
  status: T.ProgressStatus
  subtasks: { name: string; pass: boolean }[] | null
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
          <TestStatusIcon size="small" status={props.status} />
        </div>
        <div>
          {/* content */}
          <div css={styles.content}>
            <Markdown>{props.content || ''}</Markdown>
          </div>
          {/* subtasks */}
          {props.subtasks ? (
            <ul css={styles.subtasks}>
              {props.subtasks.map((subtask) => {
                let subtaskStatus: 'COMPLETE' | 'ACTIVE'
                if (props.status === 'COMPLETE') {
                  subtaskStatus = 'COMPLETE'
                } else {
                  subtaskStatus = subtask.pass ? 'COMPLETE' : 'ACTIVE'
                }

                return (
                  <li key={subtask.name} css={styles.subtask}>
                    <TestStatusIcon size="xs" status={subtaskStatus} />
                    <span style={{ marginLeft: '0.5rem' }}>{subtask.name}</span>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Step
