const TapParser = require('tap-parser')

// https://github.com/tapjs/tap-parser#var-p--new-parseroptions-cb
const options = {
	bail: true,
}

const parser = new TapParser(options)

export default parser