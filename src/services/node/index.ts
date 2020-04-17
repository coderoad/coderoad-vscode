import { exec as cpExec } from 'child_process'
import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import { WORKSPACE_ROOT } from '../../environment'

const asyncExec = promisify(cpExec)

interface ExecParams {
  command: string
  path?: string
}

export const exec = (params: ExecParams): Promise<{ stdout: string; stderr: string }> | never => {
  return asyncExec(params.command, {
    cwd: join(WORKSPACE_ROOT, params.path || ''),
  })
}

export const exists = (...paths: string[]): boolean | never => {
  return fs.existsSync(join(WORKSPACE_ROOT, ...paths))
}
