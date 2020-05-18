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
      summary: event.payload.fail.summary,
    }),
  }),
  // @ts-ignore
  testClear: assign({
    testStatus: null,
  }),
  // @ts-ignore
  testSubtasks: assign({
    testStatus: (context, event) => ({
      type: 'hidden',
      title: '',
      content: '',
      summary: event.payload.summary,
    }),
  }),
}

export default testActions
