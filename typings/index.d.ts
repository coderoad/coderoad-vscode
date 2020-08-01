import * as E from './error'
import * as TT from './tutorial'

export type LevelUI = {
  id: string
  title: string
  /** A summary of the level */
  summary: string
  /** The lesson content of the level, parsed as markdown */
  content: string
  /** A set of tasks for users linked to unit tests */
  steps: StepUI[]
  status: ProgressStatus
}

export type StepUI = {
  id: string
  content: string
  status: ProgressStatus
  hints?: string[]
  subtasks?: SubtaskUI[]
}

export type SubtaskUI = { name: string; status: ProgressStatus }

export type ProgressStatus = 'ACTIVE' | 'COMPLETE' | 'INCOMPLETE' | 'FAIL'

export interface Progress {
  levels: {
    [levelId: string]: boolean
  }
  steps: {
    [stepId: string]: boolean
  }
  complete: boolean
}

export interface StepProgress {
  [stepId: string]: boolean
}

// current tutorial position
export interface Position {
  levelId: string
  stepId: string | null
  complete: boolean
}

// current tutorial state

export interface Action {
  type: string
  payload?: any
  meta?: any
}

export interface Environment {
  machineId: string
  sessionId: string
  token: string
}

export interface TestStatus {
  type: 'success' | 'warning' | 'error' | 'loading' | 'hidden'
  title: string
  content?: string
  summary?: { [testName: string]: boolean }
  timeout?: number
}

export interface MachineContext {
  env: Environment
  error: E.ErrorMessage | null
  tutorial: TT.Tutorial | null
  position: Position
  processes: ProcessEvent[]
  testStatus: TestStatus | null
}

export interface MachineEvent {
  type: string
  payload?: any
  data?: any
}

export interface MachineStateSchema {
  states: {
    Setup: {
      states: {
        Startup: {}
        ValidateSetup: {}
        Start: {}
        SelectTutorial: {}
        SetupNewTutorial: {}
        StartTutorial: {}
      }
    }
    Tutorial: {
      states: {
        Level: {
          states: {
            Load: {}
            Normal: {}
            TestRunning: {}
            StepNext: {}
            LevelComplete: {}
            LoadNext: {}
          }
        }
        Completed: {}
      }
    }
  }
}

export interface StateMachine {
  activate(): void
  deactivate(): void
  send(action: string | Action): void
}

interface MessageState {
  state: string
}

export interface ProcessEvent {
  title: string
  description: string
  status: 'RUNNING' | 'SUCCESS' | 'FAIL' | 'ERROR'
}

export type TestFail = {
  title: string
  description: string
  summary: { [testName: string]: boolean }
}
