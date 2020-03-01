import * as CR from 'typings'
import { assign, ActionFunctionMap } from 'xstate'

const testActions: ActionFunctionMap<CR.MachineContext, CR.MachineEvent> = {
  // @ts-ignore
  testStart: assign({
    testStatus: () => ({
      type: 'loading',
      title: 'Test running...',
    }),
  }),
  // @ts-ignore
  testPass: assign({
    testStatus: () => ({
      type: 'success',
      title: 'Success!',
    }),
  }),
  // @ts-ignore
  testFail: assign({
    testStatus: (context, event) => ({
      type: 'warning',
      title: 'Fail!',
      content: event.payload.message,
    }),
  }),
  // @ts-ignore
  testClear: assign({
    testStatus: null,
  }),
}

export default testActions
