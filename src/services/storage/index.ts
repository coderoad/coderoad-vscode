import * as vscode from 'vscode'
import { readFile, writeFile } from '../node'
import { SESSION_FILE_PATH } from '../../environment'

// NOTE: localStorage is not available on client
// and must be stored in editor
// https://github.com/Microsoft/vscode/issues/52246

// storage is unfortunately bound to the vscode extension context
// forcing it to be passed in through activation and down to other tools
class Storage<T> {
  private key: string
  private storage: vscode.Memento
  private defaultValue: T
  constructor({ key, storage, defaultValue }: { key: string; storage: vscode.Memento; defaultValue: T }) {
    this.storage = storage
    this.key = key
    this.defaultValue = defaultValue
  }
  public get = async (): Promise<T> => {
    const value: string | undefined = await this.storage.get(this.key)
    if (value) {
      return JSON.parse(value)
    } else if (SESSION_FILE_PATH) {
      // optionally read from file as a fallback to localstorage
      const sessionFile = await readFile(SESSION_FILE_PATH)
      try {
        const session = JSON.parse(sessionFile)
        if (session && session[this.key]) {
          // TODO: validate session
          return session[this.key]
        }
      } catch (err) {
        console.error(`Failed to parse session file: ${SESSION_FILE_PATH}`)
      }
    }
    return this.defaultValue
  }
  public set = (value: T): void => {
    const stringValue = JSON.stringify(value)
    this.storage.update(this.key, stringValue)
  }
  public update = async (value: T): Promise<void> => {
    const current = await this.get()
    const next = JSON.stringify({
      ...current,
      ...value,
    })
    this.storage.update(this.key, next).then(() => {
      // optionally write to file
      if (SESSION_FILE_PATH) {
        writeFile(this.storage, SESSION_FILE_PATH)
      }
    })
  }
  public reset = () => {
    this.set(this.defaultValue)
  }
}

export default Storage
