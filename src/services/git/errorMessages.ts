interface ErrorMessageFilter {
    [lang: string]: {
        [key: string]: string
    }
}

const errorMessages: ErrorMessageFilter = {
    js: {
        'node-gyp': 'Error running npm setup command'
    }
}

export default errorMessages