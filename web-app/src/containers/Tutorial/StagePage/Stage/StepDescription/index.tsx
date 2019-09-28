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
  if (mode === 'INCOMPLETE') {
    return null
  }
  return (
    <div style={styles.card}>
      <Markdown>{text || ''}</Markdown>
      {mode === 'ACTIVE' && <Button onClick={onLoadSolution}>Load Solution</Button>}
    </div>
  )
}

export default StepDescription
