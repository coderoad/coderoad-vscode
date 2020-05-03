import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as vscode from 'vscode'
import Storage from '../../services/storage'

const defaultValue: T.Progress = {
  levels: {},
  steps: {},
  complete: false,
}

// hold current progress and sync to storage based on tutorial.id/version
class Progress {
  private value: T.Progress
  private storage: Storage<T.Progress> | undefined
  constructor() {
    this.value = defaultValue
  }
  public setTutorial = async (workspaceState: vscode.Memento, tutorial: TT.Tutorial): Promise<T.Progress> => {
    this.storage = new Storage<T.Progress>({
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
  public set = (value: T.Progress) => {
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
  public syncProgress = (progress: T.Progress): T.Progress => {
    const next = { ...this.value, ...progress }
    return this.set(next)
  }
  public setStepComplete = (tutorial: TT.Tutorial, stepId: string): T.Progress => {
    const next = this.value
    // mark step complete
    next.steps[stepId] = true

    const currentLevel = tutorial.levels.find((l) => l.steps.find((s) => s.id === stepId))
    if (!currentLevel) {
      throw new Error(`setStepComplete level not found for stepId ${stepId}`)
    }

    if (currentLevel.steps[currentLevel.steps.length - 1].id === stepId) {
      // final step for level is complete
      next.levels[currentLevel.id] = true

      if (tutorial.levels[tutorial.levels.length - 1].id === currentLevel.id) {
        //final level complete so tutorial is complete
        next.complete = true
      }
    }

    return this.set(next)
  }
}

export default Progress
