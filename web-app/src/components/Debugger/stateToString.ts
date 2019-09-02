const stateToString = (state: string | object, str: string = ''): string => {
	if (typeof state === 'object') {
		const keys = Object.keys(state)
		if (keys && keys.length) {
			const key = keys[0]
			// @ts-ignore
			return stateToString(state[key], str.length ? `${str}.${key}` : key)
		}
		return str
	} else if (typeof state === 'string') {
		return str.length ? `${str}.${state}` : state
	}
	return ''
}

export default stateToString