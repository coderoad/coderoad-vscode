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
}

const Hints = (props: Props) => {
  const [hintIndex, setHintIndex] = React.useState(-1)
  const isFinalHint = props.hints.length - 1 === hintIndex
  const nextHint = () => {
    if (!isFinalHint) {
      setHintIndex((currentHintIndex) => currentHintIndex + 1)
    }
  }
  return (
    <div style={styles.hints}>
      <div style={styles.hintList}>
        {props.hints.map((h, i) => {
          return i <= hintIndex ? (
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
