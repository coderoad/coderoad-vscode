import * as React from 'react'
import { Dialog, Message } from '@alifd/next'
import Button from '../../../components/Button'

interface Props {
  onContinue(): void
}

const Continue = (props: Props) => {
  const [modalState, setModalState] = React.useState<'none' | 'continue'>('none')

  const onClose = () => {
    setModalState('none')
  }

  const onOk = () => {
    setModalState('continue')
    props.onContinue()
    return setTimeout(() => {
      setModalState('none')
    }, 3000)
  }

  return (
    <>
      <Button type="primary" size="medium" onClick={() => setModalState('continue')}>
        Continue
      </Button>
      <Dialog
        visible={modalState === 'continue'}
        onOk={onOk}
        onCancel={onClose}
        onClose={onClose}
        footerActions={['ok', 'cancel']}
      >
        <Message>Level Complete</Message>
      </Dialog>
    </>
  )
}

export default Continue
