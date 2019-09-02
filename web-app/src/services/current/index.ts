// import * as React from 'react'
import * as CR from 'typings'

// const CurrentContext = React.createContext<CurrentTutorialParams>({
// 	tutorialId: '',
// 	version: '',
// 	position: {levelId: '', stageId: '', stepId: ''},
// 	progress: {
// 		levels: {},
// 		stages: {},
// 		steps: {},
// 		complete: false
// 	}
// })

interface CurrentTutorialParams {
	tutorialId: string
	version: string
	position: CR.Position
	progress: CR.Progress
}

interface SetCurrentTutorialParams {
	tutorialId?: string
	version?: string
	position?: CR.Position
	progress?: CR.Progress
}

class CurrentTutorial {
	private tutorialId = ''
	private version = ''
	private position: CR.Position = {levelId: '', stageId: '', stepId: ''}
	private progress: CR.Progress = {levels: {}, stages: {}, steps: {}, complete: false}
	public set({tutorialId, version, position, progress}: SetCurrentTutorialParams) {
		this.tutorialId = tutorialId || this.tutorialId
		this.version = version || this.version
		this.position = position || this.position
		this.progress = progress || this.progress
	}
	public get(): CurrentTutorialParams {
		return {
			tutorialId: this.tutorialId,
			version: this.version,
			position: this.position,
			progress: this.progress,
		}
	}
	public clear() {
		this.tutorialId = ''
		this.version = ''
		this.position = {levelId: '', stageId: '', stepId: ''}
		this.progress = {levels: {}, stages: {}, steps: {}, complete: false}
	}
}

export default new CurrentTutorial()
