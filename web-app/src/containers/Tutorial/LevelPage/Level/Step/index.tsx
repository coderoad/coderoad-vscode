import * as React from 'react'
import * as T from 'typings'
import Button from '../../../../../components/Button'
import Checkbox from '../../../../../components/Checkbox'
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
        <Checkbox status={props.status} />
      </div>
      <div>
        <Markdown>{props.content || ''}</Markdown>
      </div>
      <div>
        {showLoadSolution && (
          <Button type="normal" onClick={onClickHandler}>
            Load Solution
          </Button>
        )}
      </div>
    </div>
  )
}

export default Step
