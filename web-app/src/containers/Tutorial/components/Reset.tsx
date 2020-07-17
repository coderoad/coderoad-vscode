import * as React from 'react'
import { Dialog, Message } from '@alifd/next'
import Button from '../../../components/Button'

interface Props {
  disabled: boolean
  onReset(): void
}

const Reset = (props: Props) => {
  const [modalState, setModalState] = React.useState<'none' | 'confirm' | 'progress'>('none')

  const onClose = () => {
    setModalState('none')
  }

  const onOk = () => {
    setModalState('progress')
    props.onReset()
    return setTimeout(() => {
      setModalState('none')
    }, 3000)
  }

  return (
    <>
      <Button type="secondary" size="medium" onClick={() => setModalState('confirm')} disabled={props.disabled}>
        Reset
      </Button>
      <Dialog
        visible={modalState === 'confirm'}
        onOk={onOk}
        onCancel={onClose}
        onClose={onClose}
        footerActions={['ok', 'cancel']}
      >
        <Message type="warning" title="Are you sure you want to reset?">
          Resetting progress will replace your progress with the tutorial's standard progress. Your code may look
          different after resetting.
        </Message>
      </Dialog>
      <Dialog visible={modalState === 'progress'} footer={false} onClose={onClose} closeable={false}>
        <Message type="loading" title="Resetting..." />
      </Dialog>
    </>
  )
}

export default Reset
