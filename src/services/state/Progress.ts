import * as CR from 'typings'

// progress
class Progress {
	private value: CR.Progress
	constructor() {
		this.value = {
			levels: {},
			stages: {},
			steps: {},
			complete: false
		}
	}
	public get = () => {
		return this.value
	}
	public set = (value: CR.Progress) => {
		this.value = value
	}
}

export default Progress