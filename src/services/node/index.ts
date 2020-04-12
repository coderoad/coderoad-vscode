import { exec as cpExec } from 'child_process'
import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import { WORKSPACE_ROOT } from '../../environment'

const asyncExec = promisify(cpExec)

export const exec = (cmd: string): Promise<{ stdout: string; stderr: string }> | never => {
  return asyncExec(cmd, {
    cwd: WORKSPACE_ROOT,
  })
}

export const exists = (...paths: string[]): boolean | never => {
  return fs.existsSync(join(WORKSPACE_ROOT, ...paths))
}
