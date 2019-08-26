import * as vscode from 'vscode'

class EditorStorage {
	private storage: vscode.Memento
	constructor() {
		this.storage = {} as vscode.Memento
	}
	public init = (storage: vscode.Memento): void => {
		console.log('setStorage workspace')
		this.storage = storage
	}
	public get = <T>(key: string): T | undefined => {
		console.log(`called get ${key}`)
		return this.storage.get(key)
	}
	public update = <T>(key: string, value: string | object): Thenable<void> => {
		console.log(`called update on ${key}`)
		return this.storage.update(key, value)
	}
}

export default new EditorStorage()
