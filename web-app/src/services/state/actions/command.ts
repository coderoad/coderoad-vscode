import { assign } from 'xstate'
import * as T from 'typings'

export default {
  // @ts-ignore
  commandStart: assign({
    processes: ({ processes }: T.MachineContext, event: T.MachineEvent): T.ProcessEvent[] => {
      const { process } = event.payload
      const isRunning = processes.find(p => p.title === process.title)
      if (!isRunning) {
        processes = processes.concat(process)
      }
      return processes
    },
  }),
  // @ts-ignore
  commandSuccess: assign({
    processes: ({ processes }: T.MachineContext, event: T.MachineEvent): T.ProcessEvent[] => {
      const { process } = event.payload
      return processes.filter(p => p.title !== process.title)
    },
  }),
  // @ts-ignore
  commandFail: assign({
    processes: ({ processes }: T.MachineContext, event: T.MachineEvent): T.ProcessEvent[] => {
      const { process } = event.payload
      return processes.filter(p => p.title !== process.title)
    },
  }),
}
