import * as React from 'react'
import * as T from 'typings'
import { Button, Checkbox } from '@alifd/next'

import Markdown from '../../../../../components/Markdown'

interface Props {
  order: number
  content: string
  status: T.ProgressStatus
  onLoadSolution(): void
}

const styles = {
  card: {
		display: 'grid',
		
    padding: '0 1rem 1rem 0.5rem',
  },
}

const Step = (props: Props) => {
  const [loadedSolution, setLoadedSolution] = React.useState()

  const onClickHandler = () => {
    if (!loadedSolution) {
      setLoadedSolution(true)
      props.onLoadSolution()
    }
  }

  const showLoadSolution = status === 'ACTIVE' && !loadedSolution

  return (
    <div style={styles.card}>
      <Checkbox
        checked={status === 'COMPLETE'}
        indeterminate={false}
        disabled={status === 'INCOMPLETE'}
      />
      <Markdown>{props.content || ''}</Markdown>
      {showLoadSolution && <Button onClick={onClickHandler}>Load Solution</Button>}
    </div>
  )
}

export default Step
