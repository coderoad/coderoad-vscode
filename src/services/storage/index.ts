import * as vscode from 'vscode'

// NOTE: localStorage not available on client
// must be stored in editor
// https://github.com/Microsoft/vscode/issues/52246

// storage is unfortunately bound to the vscode extension context
// forcing it to be passed in through activation and down to other tools
class Storage<T> {
	private key: string
	private storage: vscode.Memento
	constructor({key, storage, defaultValue}: {key: string, storage: vscode.Memento, defaultValue?: T}) {
		this.storage = storage
		this.key = key
		// set default if none exists
		if (!defaultValue) {
			return
		}
		this.get().then((value: T | null) => {
			if (!value) {
				this.set(defaultValue)
			}
		})
	}
	public get = async (): Promise<T | null> => {
		const value: string | undefined = await this.storage.get(this.key)
		// console.log(`STORAGE.get ${this.key} : ${JSON.stringify(value)}`)
		if (value) {
			return JSON.parse(value)
		}
		return null
	}
	public set = (value: T): void => {
		const stringValue = JSON.stringify(value)
		// console.log(`STORAGE.set ${this.key} ${JSON.stringify(value)}`)
		this.storage.update(this.key, stringValue)
	}
	public update = async (value: T): Promise<void> => {
		const current = await this.get()
		this.set({
			...current,
			...value,
		})
	}
}

export default Storage