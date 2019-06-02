export interface TutorialLevel {
    stageList: string[]
    content?: {
        title?: string
        text?: string
    }
}

export interface TutorialStage {
    stepList: string[]
    content?: {
        title?: string
        text?: string
    }
}

export interface TutorialHint {
    text: string
    displayed?: boolean
}

export interface TutorialAction {
    commits: string[]
    commands?: string[]
    files?: string[]
}

export interface TutorialStepContent {
    text: string
    title?: string
}

export interface TutorialStep {
    content: TutorialStepContent
    actions: {
        setup: TutorialAction
        solution: TutorialAction
    }
    hints?: TutorialHint[]
}

export interface TutorialData {
    summary: TutorialSummary
    levels: {
        [levelId: string]: TutorialLevel
    }
    stages: {
        [stageId: string]: TutorialStage
    }
    steps: {
        [stepId: string]: TutorialStep
    }
}

export interface TutorialMeta {
    version: string
    repo: string
    createdBy: string
    createdAt: string
    updatedBy: string
    updatedAt: string
    contributors: string[]
    languages: string[]
    testRunner: string
}

export interface TutorialSummary {
    title: string
    description: string
    levelList: string[]
}

export interface Tutorial {
    id: string
    meta: TutorialMeta
    data: TutorialData
}

export interface Progress {
    levels: {
        [levelId: string]: boolean
    }
    stages: {
        [stageId: string]: boolean
    }
    steps: {
        [stepId: string]: boolean
    }
    complete: boolean
}

// current tutorial position
export interface Position {
    levelId: string
    stageId: string
    stepId: string
    complete?: boolean
}

// current tutorial state

export interface Action {
    type: string
    payload?: any
    meta?: any
}

export interface MachineContext {
    position: Position
    data: {
        summary: TutorialSummary
        levels: {
            [levelId: string]: TutorialLevel
        }
        stages: {
            [stageId: string]: TutorialStage
        }
        steps: {
            [stepId: string]: TutorialStep
        }
    }
    progress: Progress
}

export interface MachineEvent {
    type: string
    payload?: any
}

export interface MachineStateSchema {
    states: {
        Start: {
            states: {
                Initial: {}
                NewTutorial: {
                    states: {
                        SelectTutorial: {}
                        InitializeTutorial: {}
                    }
                }
                ContinueTutorial: {}
            }
        }
        Tutorial: {
            states: {
                LoadNext: {}
                Summary: {}
                Level: {}
                Stage: {
                    states: {
                        StageNormal: {}
                        TestRunning: {}
                        TestPass: {}
                        TestFail: {}
                        StageComplete: {}
                    }
                }
                EndTutorial: {}
            }
        }
    }
}