import { exec } from '../../node'
import { send } from '../../../commands'

const runCommands = async (commands: string[] = []): Promise<void> => {
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
      result = await exec({ command })
      console.log(result)
    } catch (error) {
      console.error(`Test failed: ${error.message}`)
      send({ type: 'COMMAND_FAIL', payload: { process: { ...process, status: 'FAIL' } } })
      return
    }
    send({ type: 'COMMAND_SUCCESS', payload: { process: { ...process, status: 'SUCCESS' } } })
  }
}

export default runCommands
