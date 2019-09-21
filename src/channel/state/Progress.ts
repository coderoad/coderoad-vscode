import * as CR from 'typings'
import * as G from 'typings/graphql'
import * as vscode from 'vscode'

import Storage from '../../services/storage'

const defaultValue = {
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
	public setTutorial = (workspaceState: vscode.Memento, tutorial: G.Tutorial) => {
		this.storage = new Storage<CR.Progress>({
			key: `coderoad:progress:${tutorial.id}:${tutorial.version}`,
			storage: workspaceState,
			defaultValue,
		})// set value from storage
		this.storage.get().then((value: CR.Progress) => {
			this.value = value
		})
	}
	public get = () => {
		return this.value
	}
	public set = (value: CR.Progress) => {
		this.value = value
		if (this.storage) {
			this.storage.set(value)
		}
	}
}

export default Progress