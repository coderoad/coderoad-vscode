import * as G from 'typings/graphql'

// localStorage not available on client
// must be stored in editor

class Storage<T> {
	private key: string
	// TODO: replace somehow with localStorage
	// window.localStorage not working inside of vscode
	private storage = localStorage
	constructor({key, value}: {key: string, value: T}) {
		this.key = key
		this.set(value)
	}
	public get = async (): Promise<T | null> => {
		const value = await this.storage.getItem(this.key)
		if (value) {
			return JSON.parse(value)
		}
		return null
	}
	public set = (value: T): void => {
		const stringValue = JSON.stringify(value)
		this.storage.setItem(this.key, stringValue)
	}
	public update = async (value: T): Promise<void> => {
		const current = await this.get()
		this.set({
			...current,
			...value,
		})
	}
}

export const tutorial = new Storage<G.Tutorial | null>({
	key: 'coderoad:tutorial',
	value: null
})
export const stepProgress = new Storage<{[stepId: string]: boolean}>({
	key: 'coderoad:progress',
	value: {}
})
