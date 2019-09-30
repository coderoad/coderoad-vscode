import node from '../node'


const gitOrigin = 'coderoad'

const stashAllFiles = async () => {
	// stash files including untracked (eg. newly created file)
	const {stdout, stderr} = await node.exec(`git stash --include-untracked`)
	if (stderr) {
		console.error(stderr)
		throw new Error('Error stashing files')
	}
}

const cherryPickCommit = async (commit: string, count = 0): Promise<void> => {
	if (count > 1) {
		console.warn('cherry-pick failed')
		return
	}
	try {
		const {stdout} = await node.exec(`git cherry-pick ${commit}`)
		if (!stdout) {
			throw new Error('No cherry-pick output')
		}
	} catch (error) {
		console.log('cherry-pick-commit failed')
		// stash all files if cherry-pick fails
		await stashAllFiles()
		return cherryPickCommit(commit, ++count)
	}
}



/*
    SINGLE git cherry-pick %COMMIT%
    if fails, will stash all and retry
*/
export function loadCommit(commit: string): Promise<void> {
	return cherryPickCommit(commit)
}

/* 
    save commit
    git commit -am '${level}/${stage}/${step} complete'
*/

export async function saveCommit(message: string): Promise<void> {
	const {stdout, stderr} = await node.exec(`git commit -am '${message}'`)
	if (stderr) {
		console.error(stderr)
		throw new Error('Error saving progress to Git')
	}
	console.log('save with commit & continue stdout', stdout)
}

export async function clear(): Promise<void> {
	try {
		// commit progress to git
		const {stderr} = await node.exec('git reset HEAD --hard && git clean -fd')
		if (!stderr) {
			return
		}
		console.error(stderr)
	} catch (error) {
		console.error(error)
	}
	throw new Error('Error cleaning up current unsaved work')
}

export async function version(): Promise<string | boolean> {
	const {stdout, stderr} = await node.exec('git --version')
	if (!stderr) {
		const match = stdout.match(/^git version (\d+\.)?(\d+\.)?(\*|\d+)/)
		if (match) {
			// eslint-disable-next-line
			const [_, major, minor, patch] = match
			return `${major}${minor}${patch}`
		}
	}
	throw new Error('Git not installed. Please install Git')
}

async function init(): Promise<void> {
	const {stderr} = await node.exec('git init')
	if (stderr) {
		throw new Error('Error initializing Gits')
	}
}

export async function initIfNotExists(): Promise<void> {
	const hasGit = await version()

	if (!hasGit) {
		throw new Error('Git must be installed')
	}

	const hasGitInit = node.exists('.git')
	if (!hasGitInit) {
		await init()
	}
}

export async function addRemote(repo: string): Promise<void> {
	const {stderr} = await node.exec(`git remote add ${gitOrigin} ${repo} && git fetch ${gitOrigin}`)
	if (stderr) {
		const alreadyExists = stderr.match(`${gitOrigin} already exists.`)
		const successfulNewBranch = stderr.match('new branch')

		// validate the response is acceptable
		if (!alreadyExists && !successfulNewBranch) {
			console.error(stderr)
			throw new Error('Error adding git remote')
		}
	}
}

export async function checkRemoteExists(): Promise<boolean> {
	try {
		const {stdout, stderr} = await node.exec('git remote -v')
		if (stderr) {
			return false
		}
		// string match on remote output
		// TODO: improve the specificity of this regex
		return !!stdout.match(gitOrigin)
	} catch (error) {
		return false
	}
}

export async function setupRemote(repo: string): Promise<void> {
	// check coderoad remote not taken
	const hasRemote = await checkRemoteExists()
	// git remote add coderoad tutorial
	// git fetch coderoad
	if (!hasRemote) {
		await addRemote(repo)
	}
}
