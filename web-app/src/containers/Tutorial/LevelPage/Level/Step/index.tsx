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
    gridTemplateColumns: '25px 1fr',
    padding: '1rem 1rem 1rem 0.2rem',
  },
  content: {
    margin: 0,
  },
}

const Step = (props: Props) => {
  // TODO: extract or replace load solution
  const [loadedSolution, setLoadedSolution] = React.useState()
  const onClickHandler = () => {
    if (!loadedSolution) {
      setLoadedSolution(true)
      props.onLoadSolution()
    }
  }
  const showLoadSolution = props.status === 'ACTIVE' && !loadedSolution

  return (
    <div style={styles.card}>
      <div>
        <Checkbox
          checked={props.status === 'COMPLETE'}
          indeterminate={false /* TODO: running */}
          disabled={props.status !== 'INCOMPLETE' /* TODO: and not running */}
          onChange={() => {
            /* do nothing */
          }}
        />
      </div>
      <div>
        <Markdown>{props.content || ''}</Markdown>
      </div>
      <div>{showLoadSolution && <Button onClick={onClickHandler}>Load Solution</Button>}</div>
    </div>
  )
}

export default Step
