import * as React from 'react'
import Button from '../../../components/Button'

interface Props {
  hints: string[]
}

const Hints = (props: Props) => {
  const [hintIndex, setHintIndex] = React.useState(0)
  const isFinalHint = props.hints.length - 1 === hintIndex
  console.log(hintIndex)
  const nextHint = () => {
    console.log(hintIndex)
    if (!isFinalHint) {
      setHintIndex((currentHintIndex) => currentHintIndex + 1)
    }
  }
  return (
    <div>
      {props.hints.map((h, i) => {
        return i <= hintIndex ? (
          <div key={i} style={{ backgroundColor: 'red' }}>
            {h}
          </div>
        ) : null
      })}
      <Button onClick={nextHint} disabled={isFinalHint}>
        Next Hint
      </Button>
    </div>
  )
}

export default Hints
