import node from '../node'

interface GitAction {
  command: string
  onError?(stderr: string): any
  onSuccess?(stdout: string): any
}

// handle common node.exec logic
export const gitAction = async ({ command, onError, onSuccess }: GitAction) => {
  const { stdout, stderr } = await node.exec(command)
  if (onError && stderr) {
    return onError(stderr)
  } else if (onSuccess && stdout) {
    return onSuccess(stdout)
  }
}
