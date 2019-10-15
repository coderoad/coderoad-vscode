import * as vscode from 'vscode'

// NOTE: localStorage is not available on client
// and must be stored in editor
// https://github.com/Microsoft/vscode/issues/52246

// storage is unfortunately bound to the vscode extension context
// forcing it to be passed in through activation and down to other tools
class Storage<T> {
	private key: string
	private storage: vscode.Memento
	private defaultValue: T
	constructor({key, storage, defaultValue}: {key: string, storage: vscode.Memento, defaultValue: T}) {
		this.storage = storage
		this.key = key
		this.defaultValue = defaultValue
	}
	public get = async (): Promise<T> => {
		// const value: string | undefined = await this.storage.get(this.key)
		// if (value) {
		// 	return JSON.parse(value)
		// }
		return this.defaultValue
	}
	public set = (value: T): void => {
		const stringValue = JSON.stringify(value)
		this.storage.update(this.key, stringValue)
	}
	public update = async (value: T): Promise<void> => {
		const current = await this.get()
		const next = JSON.stringify({
			...current,
			...value,
		})
		this.storage.update(this.key, next)
	}
	public reset = () => {
		this.set(this.defaultValue)
	}
}

export default Storage