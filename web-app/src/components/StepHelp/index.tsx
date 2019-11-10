import * as React from 'react'
import { Balloon } from '@alifd/next'
import Button from '../Button'
import Icon from '../Icon'

const styles = {
  iconButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  balloonTitle: {
    marginTop: 0,
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
  // TODO: extract or replace load solution
  const [loadedSolution, setLoadedSolution] = React.useState()
  const onClickHandler = () => {
    if (!loadedSolution) {
      setLoadedSolution(true)
      props.onLoadSolution()
    }
  }
  const promptLeft = (
    <Button style={styles.iconButton}>
      <Icon type="prompt" role="button" />
    </Button>
  )
  return (
    <Balloon trigger={promptLeft} align="l" alignEdge triggerType="click" style={{ width: 300 }}>
      <div>
        <h4 style={styles.balloonTitle}>Stuck? Need help?</h4>
        <div style={styles.balloonOptions}>
          <Button type="secondary" onClick={onClickHandler} disabled={loadedSolution}>
            Load Solution
          </Button>
        </div>
      </div>
    </Balloon>
  )
}

export default StepHelp
