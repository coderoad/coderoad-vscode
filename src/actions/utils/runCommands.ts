import * as T from 'typings'
import { exec } from '../../services/node'

interface RunCommands {
  commands: string[]
  send: (action: T.Action) => void
  dir?: string
}

const runCommands = async ({ commands, send, dir }: RunCommands) => {
  if (!commands.length) {
    return
  }
  for (const command of commands) {
    const process = {
      title: command,
      description: 'Running process...',
    }
    send({ type: 'COMMAND_START', payload: { process: { ...process, status: 'RUNNING' } } })
    let result: { stdout: string; stderr: string }
    try {
      result = await exec({ command, dir })
      console.log(result)
    } catch (error) {
      console.log(`Test failed: ${error.message}`)
      send({ type: 'COMMAND_FAIL', payload: { process: { ...process, status: 'FAIL' } } })
      return
    }
    send({ type: 'COMMAND_SUCCESS', payload: { process: { ...process, status: 'SUCCESS' } } })
  }
}

export default runCommands
