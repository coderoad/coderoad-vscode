import * as E from './error'
import * as TT from './tutorial'

export type ProgressStatus = 'ACTIVE' | 'COMPLETE' | 'INCOMPLETE'

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
  complete?: boolean
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
  progress: Progress
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
            TestPass: {}
            TestFail: {}
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

interface MessageData {
  tutorial?: { id: string }
  position: Position
  progress: Progress
}

interface MessageState {
  state: string
}

// TODO type each string param and payload
export type EditorDispatch = (type: string, payload?: MessageData | MessageState | any) => void

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
