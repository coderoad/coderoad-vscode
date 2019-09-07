import * as G from 'typings/graphql'
import * as CR from 'typings'
import * as git from '../../services/git'

interface TutorialConfig {
	codingLanguage: G.EnumCodingLanguage
	testRunner: G.EnumTestRunner
}

export interface TutorialModel {
	repo: G.TutorialRepo
	config: TutorialConfig
	version: G.TutorialVersion
	position: CR.Position
	progress: CR.Progress
	launch(tutorial: G.Tutorial): void
	hasExisting(): Promise<boolean>
	triggerCurrent(stepActions: G.StepActions): void
}

class Tutorial implements TutorialModel {
	public repo: G.TutorialRepo
	public config: TutorialConfig
	public version: G.TutorialVersion
	public position: CR.Position
	public progress: CR.Progress
	public openFile: (file: string) => void

	constructor(editorDispatch: CR.EditorDispatch) {
		// initialize types, will be assigned when tutorial is selected

		this.repo = {} as G.TutorialRepo
		this.config = {} as TutorialConfig
		this.version = {} as G.TutorialVersion
		this.position = {} as CR.Position
		this.progress = {} as CR.Progress
		this.openFile = (file: string) => editorDispatch('coderoad.open_file', file)
	}
	public launch = async (tutorial: G.Tutorial) => {
		console.log('launch tutorial')
		// machine.send('TUTORIAL_START')

		console.log('tutorial', tutorial)

		this.repo = tutorial.repo

		if (!this.repo || !this.repo.uri) {
			throw new Error('Tutorial repo uri not found')
		}

		await git.gitInitIfNotExists()
		await git.gitSetupRemote(this.repo.uri)

		this.config = {
			codingLanguage: tutorial.codingLanguage,
			testRunner: tutorial.testRunner,
		}

		// version containing level data
		this.version = tutorial.version
		console.log('version', this.version)

	}

	public async hasExisting(): Promise<boolean> {
		// instead should configure git if does not exist
		// and update git to current position

		// verify git is setup with a coderoad remote
		const [hasGit, hasGitRemote] = await Promise.all([
			git.gitVersion(),
			git.gitCheckRemoteExists(),
		])
		// TODO: may need to clean up git remote if no existing tutorial

		const canContinue = !!(hasGit && hasGitRemote)

		return canContinue
	}
	public triggerCurrent = (stepActions: G.StepActions) => {
		git.gitLoadCommits(stepActions, this.openFile)
	}
}

export default Tutorial