interface ParserOutput {
	ok: boolean
	message?: string
}

const parser = (text: string): ParserOutput => {
	const lines = text.split('\n')
	for (const line of lines) {
		// parse failed test
		const match = line.match(/^not ok \d+ - (.+)+/)
		if (!!match) {
			return {ok: false, message: match[1]}
		}
	}
	return {ok: true}
}

export default parser