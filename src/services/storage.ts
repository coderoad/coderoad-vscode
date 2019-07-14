import * as CR from 'typings'
import * as storage from '../editor/storage'

// TUTORIAL
const STORE_TUTORIAL = 'coderoad:tutorial'

export async function getTutorial(): Promise<CR.Tutorial | undefined> {
  return storage.get<CR.Tutorial>(STORE_TUTORIAL)
}

export async function setTutorial(tutorial: CR.Tutorial): Promise<void> {
  await storage.update<CR.Tutorial>(STORE_TUTORIAL, tutorial)
}

// POSITION
const STORE_POSITION = 'coderoad:position'

const defaultPosition = { levelId: '', stageId: '', stepId: '' }

export async function getPosition(): Promise<CR.Position> {
  const position: CR.Position | undefined = storage.get<CR.Position>(STORE_POSITION)
  return position || defaultPosition
}

export async function setPosition(position: CR.Position): Promise<void> {
  await storage.update<CR.Position>(STORE_POSITION, position)
}

// PROGRESS
const STORE_PROGRESS = 'coderoad:progress'

const defaultProgress = { levels: {}, stages: {}, steps: {}, hints: {}, complete: false }

export async function getProgress(): Promise<CR.Progress> {
  const progress: CR.Progress | undefined = await storage.get<CR.Progress>(STORE_PROGRESS)
  return progress || defaultProgress
}

export async function resetProgress(): Promise<void> {
  await storage.update<CR.Progress>(STORE_PROGRESS, defaultProgress)
}

interface ProgressUpdate {
  levels?: {
    [levelId: string]: boolean
  }
  stages?: {
    [stageid: string]: boolean
  }
  steps?: {
    [stepId: string]: boolean
  }
}

export async function setProgress(record: ProgressUpdate): Promise<void> {
  const progress = await getProgress()
  if (record.levels) {
    progress.levels = {
      ...progress.levels,
      ...record.levels,
    }
  }
  if (record.stages) {
    progress.stages = {
      ...progress.stages,
      ...record.stages,
    }
  }
  if (record.steps) {
    progress.steps = {
      ...progress.steps,
      ...record.steps,
    }
  }

  await storage.update<CR.Progress>(STORE_PROGRESS, progress)
}
