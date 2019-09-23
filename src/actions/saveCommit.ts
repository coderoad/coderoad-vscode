import * as git from '../services/git'

async function saveCommit() {
	console.log('committing progress')
	git.saveCommit('Save progress')
}

export default saveCommit
