import * as TT from 'typings/tutorial'
import * as vscode from 'vscode'
import Storage from '../../storage'

// Tutorial
class Tutorial {
  private storage: Storage<TT.Tutorial | null>
  private value: TT.Tutorial | null = null
  constructor(workspaceState: vscode.Memento) {
    this.storage = new Storage<TT.Tutorial | null>({
      key: 'coderoad:currentTutorial',
      filePath: 'coderoad_tutorial',
      storage: workspaceState,
      defaultValue: null,
    })
    // set value from storage
    this.storage.get().then((value: TT.Tutorial | null) => {
      this.value = value
    })
  }
  public get = (): TT.Tutorial | null => {
    return this.value
  }
  public set = (value: TT.Tutorial | null): void => {
    this.value = value
    this.storage.set(value)
  }
  public reset = (): void => {
    this.set(null)
  }
}

export default Tutorial
