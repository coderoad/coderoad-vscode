import { exec as cpExec } from 'child_process'
import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import environment from '../../environment'

const asyncExec = promisify(cpExec)

export const exec = (cmd: string): Promise<{ stdout: string; stderr: string }> | never => {
  return asyncExec(cmd, {
    cwd: environment.WORKSPACE_ROOT,
  })
}

export const exists = (...paths: string[]): boolean | never => {
  return fs.existsSync(join(environment.WORKSPACE_ROOT, ...paths))
}
