import * as CR from 'typings'

// position
class Position {
	private value: CR.Position
	constructor() {
		this.value = {
			levelId: '',
			stageId: '',
			stepId: '',
		}
	}
	public get = () => {
		return this.value
	}
	public set = (value: CR.Position) => {
		this.value = value
	}
}

export default Position