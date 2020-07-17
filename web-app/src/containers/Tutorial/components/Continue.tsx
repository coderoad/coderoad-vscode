import * as React from 'react'
import { Dialog } from '@alifd/next'
import Button from '../../../components/Button'
import ProgressPie from './ProgressPie'

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
        footerActions={['ok']}
      >
        <ProgressPie />
      </Dialog>
    </>
  )
}

export default Continue
