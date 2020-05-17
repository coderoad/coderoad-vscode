import * as React from 'react'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import Icon from '../../../components/Icon'
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
          {props.status === 'ACTIVE' && <Icon type="success-filling" size="small" style={{ color: 'lightgrey' }} />}
          {props.status === 'COMPLETE' && <Icon type="success-filling" size="small" style={{ color: '#37B809' }} />}
        </div>
        <div>
          <Markdown>{props.content || ''}</Markdown>
        </div>
        {props.subtasks ? (
          <ul>
            {props.subtasks.map((subtask) => (
              <li key={subtask.name}>{subtask.name}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export default Step
