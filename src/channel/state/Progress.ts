import * as CR from 'typings'
import * as G from 'typings/graphql'
import * as vscode from 'vscode'

import Storage from '../../services/storage'

const defaultValue: CR.Progress = {
	levels: {},
	stages: {},
	steps: {},
	complete: false
}

// hold current progress and sync to storage based on tutorial.id/version
class Progress {
	private value: CR.Progress
	private storage: Storage<CR.Progress> | undefined
	constructor() {
		this.value = defaultValue
	}
	public setTutorial = async (workspaceState: vscode.Memento, tutorial: G.Tutorial): Promise<CR.Progress> => {
		this.storage = new Storage<CR.Progress>({
			key: `coderoad:progress:${tutorial.id}:${tutorial.version}`,
			storage: workspaceState,
			defaultValue,
		})// set value from storage
		this.value = await this.storage.get() || defaultValue
		return this.value
	}
	public get = () => {
		return this.value
	}
	public set = (value: CR.Progress) => {
		this.value = value
		if (!this.storage) {
			return defaultValue
		}
		this.storage.set(value)
		return this.value
	}
	public reset = () => {
		this.set(defaultValue)
	}
	public setStepComplete = (stepId: string): CR.Progress => {
		const next = this.value
		next.steps[stepId] = true
		return this.set(next)
	}
}

export default Progress