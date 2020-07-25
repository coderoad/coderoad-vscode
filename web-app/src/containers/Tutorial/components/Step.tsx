import * as React from 'react'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import TestStatusIcon from './TestStatusIcon'
import Markdown from '../../../components/Markdown'

interface Props {
  content: string
  status: T.ProgressStatus
  subtasks?: T.SubtaskUI[]
  displayAll?: boolean
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
  const showStep = props.displayAll || props.status !== 'INCOMPLETE'
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
                return (
                  <li key={subtask.name} css={styles.subtask}>
                    <TestStatusIcon size="xs" status={subtask.status} />
                    <span style={{ marginLeft: '0.5rem' }}>
                      <Markdown>{subtask.name}</Markdown>
                    </span>
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
