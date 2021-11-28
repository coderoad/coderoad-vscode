import { exec as cpExec } from 'child_process'
import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import { WORKSPACE_ROOT } from '../../environment'

const asyncExec = promisify(cpExec)
const asyncRemoveFile = promisify(fs.unlink)
export const asyncReadFile = promisify(fs.readFile)
const asyncWriteFile = promisify(fs.writeFile)

interface ExecParams {
  command: string
  dir?: string
}

// correct paths to be from workspace root rather than extension folder
const getWorkspacePath = (...paths: string[]) => {
  return join(WORKSPACE_ROOT, ...paths)
}

export const exec = (params: ExecParams): Promise<{ stdout: string; stderr: string }> | never => {
  const cwd = join(WORKSPACE_ROOT, params.dir || '')
  return asyncExec(params.command, { cwd })
}

export const exists = (...paths: string[]): boolean | never => {
  return fs.existsSync(getWorkspacePath(...paths))
}

export const removeFile = (...paths: string[]) => {
  return asyncRemoveFile(getWorkspacePath(...paths))
}

export const readFile = (...paths: string[]): Promise<string | void> => {
  const filePath = getWorkspacePath(...paths)
  return asyncReadFile(getWorkspacePath(...paths), 'utf8').catch((err) => {
    console.warn(`Failed to read from ${filePath}: ${err.message}`)
  })
}

export const writeFile = (data: any, ...paths: string[]): Promise<void> => {
  const filePath = getWorkspacePath(...paths)
  return asyncWriteFile(filePath, data).catch((err) => {
    console.warn(`Failed to write to ${filePath}: ${err.message}`)
  })
}
