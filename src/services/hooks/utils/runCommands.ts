import { exec } from '../../node'
import { send } from '../../../commands'
import logger from '../../logger'

const runCommands = async (commands: string[] = []): Promise<void> => {
  if (!commands.length) {
    return
  }
  for (const command of commands) {
    const process = {
      title: command,
      description: 'Running process...',
    }
    logger(`Command: ${command}`)
    send({ type: 'COMMAND_START', payload: { process: { ...process, status: 'RUNNING' } } })
    let result: { stdout: string; stderr: string }
    try {
      result = await exec({ command })
      if (result.stderr) {
        throw new Error(result.stderr)
      }
      logger(`Command output: ${result.stdout}`)
    } catch (error: any) {
      logger(`Command failed: ${error.message}`)
      send({ type: '', payload: { process: { ...process, status: 'FAIL' } } })
      return
    }
    send({ type: 'COMMAND_SUCCESS', payload: { process: { ...process, status: 'SUCCESS' } } })
  }
}

export default runCommands
