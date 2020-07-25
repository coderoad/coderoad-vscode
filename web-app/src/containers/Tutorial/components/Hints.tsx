import * as React from 'react'
import { css, jsx } from '@emotion/core'
import Markdown from '../../../components/Markdown'
import Button from '../../../components/Button'
import { Theme } from '../../../styles/theme'

const styles = {
  hints: {
    marginTop: '0.5rem',
  },
  hintList: {
    marginBottom: '0.5rem',
  },
  hint: (theme: Theme) => ({
    marginBottom: '0.5rem',
    backgroundColor: theme['$color-warning-1'],
    padding: '0 0.5rem',
  }),
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
          if (index > hintIndex) {
            // hint not yet revealed
            return null
          }
          return (
            <div key={index} css={styles.hint}>
              <Markdown>{`${index + 1}.&nbsp;${hint}`}</Markdown>
            </div>
          )
        })}
      </div>
      <Button onClick={nextHint} disabled={isFinalHint}>
        Get A Hint
      </Button>
    </div>
  )
}

export default Hints
