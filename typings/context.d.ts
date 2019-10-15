import * as CR from './index'

interface ProgressStatus {
	active: boolean
	complete: boolean
}

export interface Step extends Exclude<CR.TutorialStep, 'actions'> {
	status: ProgressStatus
}

export interface ReceivedEvent {
	data: CR.Action
}

export interface LevelWithStatus extends CR.TutorialLevel {
	status: ProgressStatus
}
