import * as vscode from 'vscode'
import { readFile, writeFile } from '../node'
import { SESSION_STORAGE_PATH } from '../../environment'
import logger from '../logger'

// NOTE: localStorage is not available on client
// and must be stored in editor
// https://github.com/Microsoft/vscode/issues/52246

// storage is unfortunately bound to the vscode extension context
// forcing it to be passed in through activation and down to other tools
class Storage<T> {
  private key: string
  private filePath: string
  private storage: vscode.Memento
  private defaultValue: T
  constructor({
    key,
    filePath,
    storage,
    defaultValue,
  }: {
    key: string
    filePath: string
    storage: vscode.Memento
    defaultValue: T
  }) {
    this.storage = storage
    this.key = key
    this.filePath = filePath
    this.defaultValue = defaultValue
  }
  public get = async (): Promise<T> => {
    if (SESSION_STORAGE_PATH) {
      try {
        // 1. attempt to read from file instead of local storage if specified
        const sessionFile = await readFile(SESSION_STORAGE_PATH, `${this.filePath}.json`)
        if (!sessionFile) {
          throw new Error('No session file found')
        }
        const data: T = JSON.parse(sessionFile)

        if (data) {
          // validate session
          const keys = Object.keys(data)
          if (keys.length) {
            return data
          }
        }
      } catch (err: any) {
        logger(`Failed to read or parse session file: ${SESSION_STORAGE_PATH}/${this.filePath}.json: ${err.message}`)
      }
    } else {
      // 2. attempt to read from local storage
      const value: string | undefined = await this.storage.get(this.key)
      if (value) {
        try {
          return JSON.parse(value)
        } catch (err: any) {
          logger(`Failed to parse session state from local storage: ${value}: ${err.message}`)
        }
      }
    }
    // 3. fallback to the default
    return this.defaultValue
  }
  public set = (value: T): void => {
    const stringValue = JSON.stringify(value)
    this.storage.update(this.key, stringValue)
    this.writeToSessionFile(stringValue)
  }
  public update = async (value: T): Promise<void> => {
    const current = await this.get()
    const next = JSON.stringify({
      ...current,
      ...value,
    })
    await this.storage.update(this.key, next)

    this.writeToSessionFile(next)
  }
  public writeToSessionFile(data: string) {
    // optionally write state to file, useful when state cannot be controlled across containers
    if (SESSION_STORAGE_PATH) {
      try {
        writeFile(data, SESSION_STORAGE_PATH, `${this.filePath}.json`)
      } catch (err: any) {
        logger(
          `Failed to write coderoad session to path: ${SESSION_STORAGE_PATH}/${this.filePath}.json: ${err.message}`,
        )
      }
    }
  }
  public reset = () => {
    this.set(this.defaultValue)
  }
}

export default Storage
