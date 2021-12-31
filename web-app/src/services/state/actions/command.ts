import * as T from 'typings'
import { assign } from 'xstate'

const commands = {
  commandStart: assign({
    processes: (context: T.MachineContext, event: T.MachineEvent): any => {
      let processes: T.ProcessEvent[] = context.processes
      const process: T.ProcessEvent = event.payload.process
      const isRunning = processes.find((p) => p.title === process.title)
      if (!isRunning) {
        processes = processes.concat(process)
      }
      return processes
    },
  }),
  commandSuccess: assign({
    processes: (context: T.MachineContext, event: T.MachineEvent): any => {
      const processes: T.ProcessEvent[] = context.processes
      const process: T.ProcessEvent = event.payload.process
      return processes.filter((p) => p.title !== process.title)
    },
  }),
  commandFail: assign({
    processes: (context: T.MachineContext, event: T.MachineEvent): any => {
      const processes: T.ProcessEvent[] = context.processes
      const process: T.ProcessEvent = event.payload.process
      return processes.filter((p) => p.title !== process.title)
    },
  }),
}

export default commands
