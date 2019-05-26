import { exec } from '../utils/node'

export async function clear(): Promise<void> {
  // remove all files including ignored
  // NOTE: Linux only
  const command = 'ls -A1 | xargs rm -rf'
  const { stderr } = await exec(command)
  if (stderr) {
    console.error(stderr)
    throw new Error('Error removing all files & folders')
  }
}
