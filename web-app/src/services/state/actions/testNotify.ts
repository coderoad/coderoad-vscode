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
      title: event.payload.fail.title,
      content: event.payload.fail.description,
    }),
  }),
  // @ts-ignore
  testClear: assign({
    testStatus: null,
  }),
}

export default testActions
