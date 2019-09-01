import * as CR from 'typings'

interface CurrentTutorialParams {
	tutorialId: string
	version: string
	position: CR.Position
}

interface SetCurrentTutorialParams {
	tutorialId?: string
	version?: string
	position?: CR.Position
}

class CurrentTutorial {
	private tutorialId = ''
	private version = ''
	private position: CR.Position = {levelId: '', stageId: '', stepId: ''}
	public set({tutorialId, version, position}: SetCurrentTutorialParams) {
		this.tutorialId = tutorialId || this.tutorialId
		this.version = version || this.version
		this.position = position || this.position
	}
	public get(): CurrentTutorialParams {
		return {
			tutorialId: this.tutorialId,
			version: this.version,
			position: this.position,
		}
	}
	public clear() {
		this.tutorialId = ''
		this.version = ''
		this.position = {levelId: '', stageId: '', stepId: ''}
	}
}

export default new CurrentTutorial()
