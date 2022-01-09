import { exec as cpExec } from 'child_process'
import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import { WORKSPACE_ROOT } from '../../environment'
import logger from '../logger'

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
  const workspacePath = join(WORKSPACE_ROOT, ...paths)
  logger(`Workspace path: ${workspacePath}`)
  return workspacePath
}

export const exec = (params: ExecParams): Promise<{ stdout: string; stderr: string }> | never => {
  const cwd = join(WORKSPACE_ROOT, params.dir || '')
  logger(`Calling command: ${params.command}`)
  return asyncExec(params.command, { cwd })
}

export const exists = (...paths: string[]): boolean | never => {
  const filePath = getWorkspacePath(...paths)
  logger(`Check file exists: ${filePath}`)
  return fs.existsSync(filePath)
}

export const removeFile = (...paths: string[]) => {
  const filePath = getWorkspacePath(...paths)
  logger(`Removing file: ${filePath}`)
  return asyncRemoveFile(filePath)
}

export const readFile = (...paths: string[]): Promise<string | void> => {
  const filePath = getWorkspacePath(...paths)
  logger(`Reading file: ${filePath}`)
  return asyncReadFile(getWorkspacePath(...paths), 'utf8').catch((err) => {
    logger(`Failed to read from ${filePath}: ${err.message}`)
  })
}

export const writeFile = (data: any, ...paths: string[]): Promise<void> => {
  const filePath = getWorkspacePath(...paths)
  logger(`Writing file: ${filePath}`)
  return asyncWriteFile(filePath, data).catch((err) => {
    logger(`Failed to write to ${filePath}: ${err.message}`)
  })
}
