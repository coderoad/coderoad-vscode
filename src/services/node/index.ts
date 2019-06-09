import * as fs from 'fs'
import { join } from 'path'
import { exec as cpExec } from 'child_process'
import { promisify } from 'util'

const asyncExec = promisify(cpExec)

let workspaceRoot: string

// set workspace root
// other function will use this to target the correct cwd
export function setWorkspaceRoot(rootPath: string): void {
  workspaceRoot = rootPath
}

export const exec = (cmd: string): Promise<{ stdout: string; stderr: string }> =>
  asyncExec(cmd, {
    cwd: workspaceRoot,
  })

// note: fs.exists is deprecated
// collect all paths together
export const exists = (...paths: string[]): boolean => fs.existsSync(join(workspaceRoot, ...paths))

// export async function clear(): Promise<void> {
//   // remove all files including ignored
//   // NOTE: Linux only
//   const command = 'ls -A1 | xargs rm -rf'
//   const { stderr } = await exec(command)
//   if (stderr) {
//     console.error(stderr)
//     throw new Error('Error removing all files & folders')
//   }
// }