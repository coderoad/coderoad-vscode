import { Balloon } from '@alifd/next'
import * as React from 'react'
import Button from '../Button'
import Icon from '../Icon'

const styles = {
  iconButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    fontSize: '1.2rem',
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
  const [visible, setVisible] = React.useState(false)
  // TODO extract or replace load solution
  const [loadedSolution, setLoadedSolution] = React.useState(false)
  const onClickHandler = () => {
    if (!loadedSolution) {
      setLoadedSolution(true)
      props.onLoadSolution()
      setVisible(false)
    }
  }
  const promptLeft = (
    <Button css={styles.iconButton} onClick={() => setVisible(!visible)}>
      <Icon type="help" />
    </Button>
  )
  return (
    <Balloon
      trigger={promptLeft}
      align="l"
      alignEdge
      triggerType="click"
      css={{ width: 150 }}
      closable
      visible={visible}
      onClose={() => setVisible(false)}
    >
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
