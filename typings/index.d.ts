import * as G from './graphql'

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
  stepId: string
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

export interface ErrorMessage {
  title: string
  description?: string
}

export interface MachineContext {
  env: Environment
  error: ErrorMessage | null
  tutorial: G.Tutorial | null
}

export interface PlayMachineContext extends MachineContext {
  position: Position
  progress: Progress
  processes: ProcessEvent[]
}

export interface MachineEvent {
  type: string
  payload?: any
  data?: any
}

export interface SelectTutorialMachineStateSchema {
  states: {
    Start: {
      states: {
        Startup: {}
        Authenticate: {}
        NewOrContinue: {}
        SelectTutorial: {}
        ContinueTutorial: {}
      }
    }
  }
}

export interface PlayTutorialMachineStateSchema {
  states: {
    Tutorial: {
      states: {
        Initialize: {}
        Summary: {}
        LoadNext: {}
        Level: {
          states: {
            Load: {}
            Normal: {}
            TestRunning: {}
            TestPass: {}
            TestFail: {}
            TestError: {}
            StepNext: {}
            LevelComplete: {}
          }
        }
        Completed: {}
      }
    }
  }
}

export interface MachineStateSchema {
  states: {
    SelectTutorial: {}
    PlayTutorial: {}
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

export interface StepActions {
  id: string
  commands: string[]
  commits: string[]
  files: string[]
  watchers: string[]
}

export interface TutorialTestRunner {
  command: string
  fileFormats: string[]
}

export interface TutorialRepo {
  uri: string
  branch: string
}

export interface TutorialConfig {
  testRunner: TutorialTestRunner
  repo: TutorialRepo
}
