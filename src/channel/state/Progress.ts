import * as CR from 'typings'
import * as TT from 'typings/tutorial'
import * as vscode from 'vscode'
import Storage from '../../services/storage'

const defaultValue: CR.Progress = {
  levels: {},
  steps: {},
  complete: false,
}

// hold current progress and sync to storage based on tutorial.id/version
class Progress {
  private value: CR.Progress
  private storage: Storage<CR.Progress> | undefined
  constructor() {
    this.value = defaultValue
  }
  public setTutorial = async (workspaceState: vscode.Memento, tutorial: G.Tutorial): Promise<CR.Progress> => {
    this.storage = new Storage<CR.Progress>({
      key: `coderoad:progress:${tutorial.id}:${tutorial.version}`,
      storage: workspaceState,
      defaultValue,
    }) // set value from storage
    this.value = (await this.storage.get()) || defaultValue
    return this.value
  }
  public get = () => {
    return this.value
  }
  public set = (value: CR.Progress) => {
    this.value = value
    if (!this.storage) {
      return defaultValue
    }
    this.storage.set(value)
    return this.value
  }
  public reset = () => {
    this.set(defaultValue)
  }
  public setStepComplete = (tutorialData: TT.TutorialData, stepId: string): CR.Progress => {
    const next = this.value
    // mark step complete
    next.steps[stepId] = true

    const currentLevel = tutorialData.levels.find((l) => l.steps.find((s) => s.id === stepId))
    if (!currentLevel) {
      throw new Error(`setStepComplete level not found for stepId ${stepId}`)
    }

    if (currentLevel.steps[currentLevel.steps.length - 1]) {
      // final step for level is complete
      next.levels[currentLevel.id] = true

      if (tutorialData.levels[tutorialData.levels.length - 1].id === currentLevel.id) {
        //final level complete so tutorial is complete
        next.complete = true
      }
    }

    return this.set(next)
  }
}

export default Progress
