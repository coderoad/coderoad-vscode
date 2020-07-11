import * as React from 'react'
import { css, jsx } from '@emotion/core'
import Markdown from '../../../components/Markdown'
import Button from '../../../components/Button'

const styles = {
  hints: {
    marginTop: '0.5rem',
  },
  hintList: {
    marginBottom: '0.5rem',
  },
  hint: {
    marginBottom: '0.5rem',
    backgroundColor: 'rgba(255,229,100,0.3)',
    borderLeft: '#ffe564',
    padding: '0 0.5rem',
  },
}

interface Props {
  hints: string[]
  hintIndex: number
  setHintIndex(value: number): void
}

const Hints = (props: Props) => {
  if (!props.hints || !props.hints.length) {
    return null
  }
  const isFinalHint = props.hints.length - 1 === props.hintIndex
  const nextHint = () => {
    if (isFinalHint) {
      return
    }
    props.setHintIndex(props.hintIndex + 1)
  }
  return (
    <div css={styles.hints}>
      <div css={styles.hintList}>
        {/* only show revealed hints */}
        {props.hints.map((h, i) => {
          return i <= props.hintIndex ? (
            <div key={i} css={styles.hint}>
              <Markdown css={styles.hint}>{h}</Markdown>
            </div>
          ) : null
        })}
      </div>
      <Button onClick={nextHint} disabled={isFinalHint}>
        Get A Hint
      </Button>
    </div>
  )
}

export default Hints
