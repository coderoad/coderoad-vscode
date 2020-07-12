import * as React from 'react'
import { Dialog } from '@alifd/next'
import Button from '../../../components/Button'
import Markdown from '../../../components/Markdown'

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
        title="Reset"
        visible={modalState === 'confirm'}
        onOk={onOk}
        onCancel={onClose}
        onClose={onClose}
        footerActions={['ok', 'cancel']}
      >
        <Markdown>
          {`Are you sure you want to reset your progress? 
Resetting progress will remove the commits you have made and replace them with the tutorial commit timeline. Your code may look different after resetting.`}
        </Markdown>
      </Dialog>
      <Dialog
        title="Resetting..."
        visible={modalState === 'progress'}
        footer={false}
        onClose={onClose}
        closeable={false}
      >
        Reverting progress to an earlier commit...
      </Dialog>
    </>
  )
}

export default Reset
