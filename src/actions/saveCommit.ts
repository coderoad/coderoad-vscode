import * as git from '../services/git'

async function saveCommit() {
	git.saveCommit('Save progress')
}

export default saveCommit
