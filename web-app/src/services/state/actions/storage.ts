import * as CR from 'typings'
import * as G from 'typings/graphql'

// localStorage

class Storage<T> {
	private key: string
	private storage = localStorage
	constructor(key: string) {
		this.key = key
	}
	public get = (key: string): T | null => {
		const value = this.storage.getItem(this.key)
		if (value) {
			return JSON.parse(value)
		}
		return null
	}
	public set = (value: T): void => {
		const stringValue = JSON.stringify(value)
		this.storage.setItem(this.key, stringValue)
	}
}

export const tutorial = new Storage<G.Tutorial | null>('coderoad:tutorial')
export const position = new Storage<CR.Position>('coderoad:position')
export const progress = new Storage<CR.Progress>('coderoad:progress')
