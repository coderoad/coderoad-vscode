import * as CR from 'typings'
import * as G from 'typings/graphql'
import * as vscode from 'vscode'
import Position from './state/Position'
import Progress from './state/Progress'
import Tutorial from './state/Tutorial'

class Context {
  public tutorial: Tutorial
  public position: Position
  public progress: Progress
  constructor(workspaceState: vscode.Memento) {
    // state held in one place
    this.tutorial = new Tutorial(workspaceState)
    this.position = new Position()
    this.progress = new Progress()
  }
  public setTutorial = async (
    workspaceState: vscode.Memento,
    tutorial: G.Tutorial,
  ): Promise<{ progress: CR.Progress; position: CR.Position }> => {
    this.tutorial.set(tutorial)
    const progress: CR.Progress = await this.progress.setTutorial(workspaceState, tutorial)
    const position: CR.Position = this.position.setPositionFromProgress(tutorial, progress)
    return { progress, position }
  }
  public reset = () => {
    this.tutorial.reset()
    this.progress.reset()
    this.position.reset()
  }
}

export default Context
