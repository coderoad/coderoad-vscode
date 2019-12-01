import * as G from 'typings/graphql'
import * as vscode from 'vscode'

import Storage from '../../services/storage'

// Tutorial
class Tutorial {
  private storage: Storage<G.Tutorial | null>
  private value: G.Tutorial | null = null
  constructor(workspaceState: vscode.Memento) {
    this.storage = new Storage<G.Tutorial | null>({
      key: 'coderoad:currentTutorial',
      storage: workspaceState,
      defaultValue: null,
    })
    // set value from storage
    this.storage.get().then((value: G.Tutorial | null) => {
      this.value = value
    })
  }
  public get = () => {
    return this.value
  }
  public set = (value: G.Tutorial | null) => {
    this.value = value
    this.storage.set(value)
  }
  public reset = () => {
    this.set(null)
  }
}

export default Tutorial
