import * as CR from './index'
import * as G from './graphql'

/* --- Editor Events --- */

export type EnvGetEvent = { type: 'ENV_LOAD'; payload: { env: CR.Environment } }
export type EditorTutorialConfigEvent = { type: 'EDITOR_TUTORIAL_CONFIG'; payload: { tutorial: G.Tutorial } }
export type StepActionsEvent = { type: 'SETUP_ACTIONS'; payload: CR.StepActions }
export type SolutionActionsEvent = { type: 'SOLUTION_ACTIONS'; payload: CR.StepActions }

export type EditorEvents =
  | EnvGetEvent
  | { type: 'EDITOR_TUTORIAL_LOAD' }
  | { type: 'TUTORIAL_CLEAR' }
  | EditorTutorialConfigEvent
  | { type: 'EDITOR_TUTORIAL_CONTINUE_CONFIG' }
  | StepActionsEvent
  | SolutionActionsEvent

/* --- Client Events --- */

export type EventLoadEvent = { type: 'ENV_LOAD'; payload: { env: CR.Environment } }
export type ErrorEvent = { type: 'ERROR'; payload: { error: string } }
export type CommandStartEvent = { type: 'COMMAND_START'; payload: { process: CR.ProcessEvent } }
export type CommandSuccessEvent = { type: 'COMMAND_SUCCESS'; payload: { process: CR.ProcessEvent } }
export type CommandFailEvent = { type: 'COMMAND_FAIL'; payload: { process: CR.ProcessEvent } }
export type TestPassEvent = { type: 'TEST_PASS'; payload: { stepId: string } }
export type TestFailEvent = { type: 'TEST_FAIL'; payload: { stepId: string } }
export type NextStepEvent = { type: 'NEXT_STEP'; payload: { position: CR.Position } }
export type NextLevelEvent = { type: 'NEXT_LEVEL'; payload: { position: CR.Position } }
export type TestRunningEvent = { type: 'TEST_RUNNING'; payload: { stepId: string } }
export type TestErrorEvent = { type: 'TEST_ERROR'; payload: { stepId: string } }
export type LoadNextStepEvent = { type: 'LOAD_NEXT_STEP'; payload: { step: string } }
export type ContinueTutorialEvent = {
  type: 'CONTINUE_TUTORIAL'
  payload: { tutorial: G.Tutorial; progress: CR.Progress; position: CR.Position }
}
export type LoadTutorialEvent = { type: 'LOAD_TUTORIAL'; payload: { tutorial: G.Tutorial } }
export type TutorialSelectedEvent = { type: 'TUTORIAL_SELECTED'; payload: { tutorial: G.Tutorial } }

export type AuthenticateEvents = EventLoadEvent | { type: 'AUTHENTICATED' } | ErrorEvent

export type PlayTutorialEvents =
  | CommandStartEvent
  | CommandSuccessEvent
  | CommandFailEvent
  | ErrorEvent
  | NextStepEvent
  | NextLevelEvent
  | { type: 'COMPLETED' }
  | TestRunningEvent
  | { type: 'STEP_SOLUTION_LOAD' }
  | TestPassEvent
  | TestFailEvent
  | TestErrorEvent
  | LoadNextStepEvent
  | { type: 'LEVEL_COMPLETE' }
  | { type: 'EXIT' }

export type SelectTutorialEvents =
  | ContinueTutorialEvent
  | LoadTutorialEvent
  | { type: 'NEW_TUTORIAL' }
  | { type: 'BACK' }
  | TutorialSelectedEvent
  | { type: 'TUTORIAL_CONFIGURED' }
  | { type: 'SELECT_NEW_TUTORIAL' }
  | { type: 'TUTORIAL_START' }
  | ErrorEvent

type ClientEvents = MachineEvent | AuthenticateEvents | SelectTutorialEvents | PlayTutorialEvents
