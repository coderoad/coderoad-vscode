interface ParserOutput {
	ok: boolean
}

const parser = (text: string): ParserOutput => {
	const lines = text.split('\n')
	for (const line of lines) {
		if (line.match(/^not ok /)) {
			return {ok: false}
		}
	}
	return {ok: true}
}

export default parser