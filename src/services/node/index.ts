import { exec as cpExec } from 'child_process'
import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import { WORKSPACE_ROOT } from '../../environment'

const asyncExec = promisify(cpExec)

interface ExecParams {
  command: string
  dir?: string
}

export const exec = (params: ExecParams): Promise<{ stdout: string; stderr: string }> | never => {
  const cwd = join(WORKSPACE_ROOT, params.dir || '')
  return asyncExec(params.command, { cwd })
}

export const exists = (...paths: string[]): boolean | never => {
  return fs.existsSync(join(WORKSPACE_ROOT, ...paths))
}
