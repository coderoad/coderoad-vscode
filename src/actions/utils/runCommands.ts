import * as T from 'typings'
import node from '../../services/node'

const runCommands = async (commands: string[], send: (action: T.Action) => void) => {
  if (!commands.length) {
    return
  }
  for (const command of commands) {
    const process = {
      title: command,
      description: 'Running process',
    }
    send({ type: 'COMMAND_START', payload: { process: { ...process, status: 'RUNNING' } } })
    let result: { stdout: string; stderr: string }
    try {
      result = await node.exec(command)
    } catch (error) {
      console.log(error)
      send({ type: 'COMMAND_FAIL', payload: { process: { ...process, status: 'FAIL' } } })
      return
    }
    console.log(result.stdout)
    send({ type: 'COMMAND_SUCCESS', payload: { process: { ...process, status: 'SUCCESS' } } })
  }
}

export default runCommands
