import * as React from 'react'
import Markdown from '../../../components/Markdown'
import Button from '../../../components/Button'

const styles = {
  hints: {
    marginTop: '1rem',
  },
  hintList: {
    marginBottom: '0.5rem',
  },
  hint: {
    margin: '0.5rem 0',
    backgroundColor: 'rgba(255,229,100,0.3)',
    borderLeft: '#ffe564',
    padding: '0.5rem',
  },
}

interface Props {
  hints: string[]
  hintIndex: number
  setHintIndex(value: number): void
}

const Hints = (props: Props) => {
  const isFinalHint = props.hints.length - 1 === props.hintIndex
  const nextHint = () => {
    if (isFinalHint) {
      return
    }
    props.setHintIndex(props.hintIndex + 1)
  }
  return (
    <div style={styles.hints}>
      <div style={styles.hintList}>
        {/* only show revealed hints */}
        {props.hints.map((h, i) => {
          return i <= props.hintIndex ? (
            <div key={i} style={styles.hint}>
              <Markdown>{h}</Markdown>
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
