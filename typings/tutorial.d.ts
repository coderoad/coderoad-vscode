export type Maybe<T> = T | null

export type TutorialConfig = {
  testRunner: TutorialTestRunner
  repo: TutorialRepo
  dependencies?: TutorialDependency[]
}

/** Logical groupings of tasks */
export type Level = {
  id: string
  title: string
  /** A summary of the level */
  summary: string
  /** The lesson content of the level, parsed as markdown */
  content: string
  /** Actions run on level start up for configuring setup */
  setup?: Maybe<StepActions>
  /** A set of tasks for users linked to unit tests */
  steps: Array<Step>
}

/** A level task */
export type Step = {
  id: string
  content: string
  setup: StepActions
  solution: Maybe<StepActions>
}

/** A tutorial for use in VSCode CodeRoad */
export type Tutorial = {
  id: string
  version: string
  summary: TutorialSummary
  config: TutorialConfig
  levels: Array<Level>
}

/** Summary of tutorial used when selecting tutorial */
export type TutorialSummary = {
  title: string
  description: string
}

export type StepActions = {
  commands: string[]
  commits: string[]
  files: string[]
  watchers: string[]
}

export interface TutorialTestRunner {
  command: string
}

export interface TutorialRepo {
  uri: string
  branch: string
}

export interface TutorialDependency {
  // A string command that, when run in a terminal, returns a value
  command: string
  // A regex pattern to match the output to determine if the dependency was found
  expected: string
  // A message or instructions to the user of what went wrong and what to do
  message: string
}
