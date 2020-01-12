import { Balloon } from '@alifd/next'
import * as React from 'react'
import Button from '../Button'

const styles = {
  iconButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    fontSize: 18,
    color: 'grey',
  },
  balloonTitle: {
    marginTop: 0,
    textAlign: 'center' as 'center',
  },
  balloonOptions: {
    display: 'flex',
    justifyContent: 'center',
  },
}

interface Props {
  onLoadSolution(): void
}

const StepHelp = (props: Props) => {
  // TODO extract or replace load solution
  const [loadedSolution, setLoadedSolution] = React.useState()
  const onClickHandler = () => {
    if (!loadedSolution) {
      setLoadedSolution(true)
      props.onLoadSolution()
    }
  }
  const promptLeft = <Button css={styles.iconButton}>i</Button>
  return (
    <Balloon trigger={promptLeft} align="l" alignEdge triggerType="click" css={{ width: 150 }} closable={false}>
      <div>
        <h4 css={styles.balloonTitle}>Stuck?</h4>
        <div css={styles.balloonOptions}>
          <Button type="secondary" onClick={onClickHandler} disabled={loadedSolution}>
            Load Solution
          </Button>
        </div>
      </div>
    </Balloon>
  )
}

export default StepHelp
