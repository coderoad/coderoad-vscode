import * as vscode from 'vscode'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import Storage from '../../storage'

const defaultValue: T.Position = {
  levelId: '',
  stepId: null,
  complete: false,
}

// position
class Position {
  private value: T.Position
  private storage: Storage<T.Position> | undefined
  constructor() {
    this.value = defaultValue
  }
  setTutorial(workspaceState: vscode.Memento, tutorial: TT.Tutorial) {
    this.storage = new Storage<T.Position>({
      key: `coderoad:position:${tutorial.id}:${tutorial.version}`,
      storage: workspaceState,
      defaultValue,
    })
  }
  async initPosition(workspaceState: vscode.Memento, tutorial: TT.Tutorial): Promise<T.Position> {
    // set value from storage
    this.setTutorial(workspaceState, tutorial)
    // find first level & step id
    let initLevel = tutorial.levels.length ? tutorial.levels[0] : null
    return this.set({
      levelId: initLevel?.id || '',
      stepId: initLevel?.steps.length ? initLevel.steps[0].id : null,
      complete: false,
    })
  }
  async continuePosition(workspaceState: vscode.Memento, tutorial: TT.Tutorial): Promise<T.Position> {
    this.setTutorial(workspaceState, tutorial)
    let position: T.Position = (await this.storage?.get()) || defaultValue
    return this.set(position)
  }
  public get = () => {
    return this.value
  }
  public set = (value: T.Position) => {
    this.value = value
    this.storage?.set(value)
    return this.value
  }
  public reset = () => {
    return this.set(defaultValue)
  }
}

export default Position
