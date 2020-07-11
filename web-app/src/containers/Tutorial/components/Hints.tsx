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
}

const Hints = (props: Props) => {
  // hold state for hints for the level
  const [hintIndex, setHintIndex] = React.useState<number>(-1)

  if (!props.hints || !props.hints.length) {
    return null
  }

  const isFinalHint = props.hints.length - 1 === hintIndex

  const nextHint = () => {
    if (isFinalHint) {
      return
    }
    setHintIndex(hintIndex + 1)
  }

  return (
    <div css={styles.hints}>
      <div css={styles.hintList}>
        {/* only show revealed hints */}
        {props.hints.map((hint, index) => {
          return index <= hintIndex ? (
            <div key={index} css={styles.hint}>
              <Markdown css={styles.hint}>{hint}</Markdown>
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
