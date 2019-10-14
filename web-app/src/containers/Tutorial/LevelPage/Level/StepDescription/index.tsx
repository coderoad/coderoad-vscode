import * as React from 'react'
import Markdown from '../../../../../components/Markdown'
import { Button } from '@alifd/next'

const styles = {
  // active: {
  //   backgroundColor: '#e6f7ff',
  // },
  card: {
    paddingRight: '1rem',
  },
}

interface Props {
  text?: string | null
  mode: 'INCOMPLETE' | 'ACTIVE' | 'COMPLETE'
  onLoadSolution(): void
}

const StepDescription = ({ text, mode, onLoadSolution }: Props) => {
  const [loadedSolution, setLoadedSolution] = React.useState()

  const onClickHandler = () => {
    if (!loadedSolution) {
      setLoadedSolution(true)
      onLoadSolution()
    }
  }

  if (mode === 'INCOMPLETE') {
    return null
  }

  const showLoadSolution = mode === 'ACTIVE' && !loadedSolution
  return (
    <div style={styles.card}>
      <Markdown>{text || ''}</Markdown>
      {showLoadSolution && <Button onClick={onClickHandler}>Load Solution</Button>}
    </div>
  )
}

export default StepDescription
