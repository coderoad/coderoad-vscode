import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as vscode from 'vscode'
import Position from './state/Position'
import Tutorial from './state/Tutorial'

class Context {
  public tutorial: Tutorial
  public position: Position
  private workspaceState: vscode.Memento
  constructor(workspaceState: vscode.Memento) {
    // state held in one place
    this.workspaceState = workspaceState
    this.tutorial = new Tutorial(workspaceState)
    this.position = new Position()
  }
  public onNew = async (tutorial: TT.Tutorial): Promise<{ position: T.Position }> => {
    this.tutorial.set(tutorial)
    const position: T.Position = await this.position.initPosition(this.workspaceState, tutorial)
    return { position }
  }
  public onContinue = async (tutorial: TT.Tutorial): Promise<{ position: T.Position }> => {
    const position: T.Position = await this.position.continuePosition(this.workspaceState, tutorial)
    return { position }
  }
}

export default Context
