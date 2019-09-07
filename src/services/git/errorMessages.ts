interface ErrorMessageFilter {
	[lang: string]: {
		[key: string]: string
	}
}

// likely should be loaded on startup
const errorMessages: ErrorMessageFilter = {
	js: {
		'node-gyp': 'Error running npm setup command'
	}
}

export default errorMessages