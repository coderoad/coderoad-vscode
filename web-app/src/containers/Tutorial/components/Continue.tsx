import * as React from 'react'
import { Dialog } from '@alifd/next'
import { css, jsx } from '@emotion/core'
import Button from '../../../components/Button'
import ProgressPie from './ProgressPie'

const styles = {
  content: {
    display: 'flex' as 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center' as 'center',
  },
}

interface Props {
  title: string
  current: number // level index
  max: number // level count
  onContinue(): void
}

const Continue = (props: Props) => {
  const [modalState, setModalState] = React.useState<'closed' | 'open'>('closed')

  const onClose = () => {
    setModalState('closed')
  }

  const onOpen = () => {
    setModalState('open')
  }

  const onContinue = () => {
    props.onContinue()
    onClose()
  }

  return (
    <>
      <Button type="primary" size="medium" onClick={onOpen}>
        Continue
      </Button>
      <Dialog
        title="Level Complete!"
        visible={modalState === 'open'}
        onClose={onClose}
        footer={false}
        css={{ padding: '1rem' }}
      >
        <div css={styles.content}>
          <ProgressPie current={props.current} max={props.max} />
          <div css={styles.message}>
            <h3>{props.title}</h3>
            <br />
            <Button type="primary" size="large" onClick={onContinue}>
              Continue
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default Continue
