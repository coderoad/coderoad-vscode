import * as CR from 'typings'
import { ActionFunctionMap } from 'xstate'
import notify from '../../notify'

const testActions: ActionFunctionMap<CR.MachineContext, CR.MachineEvent> = {
  testPass() {
    notify({
      key: 'test',
      title: 'Success!',
      content: '',
      duration: 1500,
    })
  },
  testFail(context, event) {
    notify({
      key: 'test',
      title: 'Fail',
      content: '',
      duration: 3000,
    })
  },
}

export default testActions
