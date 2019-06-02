import * as CR from './index'

export interface Step extends Exclude<CR.TutorialStep, 'actions'> {
    status: {
        complete: boolean
        active: boolean
    }
}

export interface ReceivedEvent {
    data: CR.Action
}

export interface StageStepStatus {
    active: boolean
    complete: boolean
}

export interface StageWithStatus extends CR.TutorialStage {
    status: StageStepStatus
}
