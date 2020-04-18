import * as React from 'react'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import Checkbox from '../../../components/Checkbox'
import Markdown from '../../../components/Markdown'

interface Props {
  order: number
  content: string
  status: T.ProgressStatus
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
  checkboxContainer: {
    paddingTop: 2,
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
        <div css={styles.checkboxContainer}>
          <Checkbox status={props.status} />
        </div>
        <div>
          <Markdown>{props.content || ''}</Markdown>
        </div>
      </div>
    </div>
  )
}

export default Step
