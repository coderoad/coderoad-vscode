import * as G from 'typings/graphql'
import * as CR from 'typings'
import * as git from '../../services/git'
import {machine} from '../../extension'
import * as storage from '../storage'

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
	updateProgress(): void
	nextPosition(): CR.Position
	hasExisting(): Promise<boolean>
	syncClient(): void
	triggerCurrent(stepActions: G.StepActions): void
}

class Tutorial implements TutorialModel {
	public repo: G.TutorialRepo
	public config: TutorialConfig
	public version: G.TutorialVersion
	public position: CR.Position
	public progress: CR.Progress
	public syncClient: () => void
	public openFile: (file: string) => void

	constructor(editorDispatch: CR.EditorDispatch) {
		// initialize types, will be assigned when tutorial is selected

		this.repo = {} as G.TutorialRepo
		this.config = {} as TutorialConfig
		this.version = {} as G.TutorialVersion
		this.position = {} as CR.Position
		this.progress = {} as CR.Progress
		this.syncClient = () => editorDispatch('coderoad.send_data', {
			tutorial: {id: this.version.tutorialId},
			progress: this.progress,
			position: this.position,
		})
		this.openFile = (file: string) => editorDispatch('coderoad.open_file', file)
	}
	public launch = async (tutorial: G.Tutorial) => {
		console.log('launch tutorial')
		machine.send('TUTORIAL_START')

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

		// set initial position
		this.position = {
			levelId: this.version.levels[0].id,
			stageId: this.version.levels[0].stages[0].id,
			stepId: this.version.levels[0].stages[0].steps[0].id,
		}
		// set empty initial progress
		this.progress = {
			levels: {},
			stages: {},
			steps: {},
			complete: false,
		}

		// setup git, git remote


		await this.syncClient()

		// set tutorial, position, progress locally
		// TODO: base position off of progress
		Promise.all([
			storage.setTutorial(tutorial),
			storage.setPosition(this.position),
			storage.setProgress(this.progress)
		])

		console.log('tutorial loaded')
		machine.send('TUTORIAL_LOADED')
	}

	public async hasExisting(): Promise<boolean> {
		const [tutorial, progress] = await Promise.all([
			storage.getTutorial(),
			storage.getProgress(),
		])

		// verify git is setup with a coderoad remote
		const [hasGit, hasGitRemote] = await Promise.all([
			git.gitVersion(),
			git.gitCheckRemoteExists(),
		])
		// TODO: may need to clean up git remote if no existing tutorial

		const canContinue = !!(tutorial && progress && hasGit && hasGitRemote)

		return canContinue
	}
	public triggerCurrent = (stepActions: G.StepActions) => {
		git.gitLoadCommits(stepActions, this.openFile)
	}
	public updateProgress = () => {
		const {levelId, stageId, stepId} = this.position
		this.progress.levels[levelId] = true
		this.progress.stages[stageId] = true
		this.progress.steps[stepId] = true

		this.syncClient()
	}
	public nextPosition = (): CR.Position => {
		const {levelId, stageId, stepId} = this.position
		// TODO: calculate and return next position

		// is next step
		const stage: G.Stage | null = this.stage(stageId)
		if (!stage) {
			throw new Error('Stage not found')
		}
		const {steps} = stage
		const indexOfStep = steps.findIndex((s: G.Step): boolean => s.id === stepId)
		if (indexOfStep === -1) {
			throw new Error('Step not found')
		}
		if (indexOfStep < steps.length - 1) {

			return {
				levelId,
				stageId,
				stepId: steps[indexOfStep + 1].id
			}
		}

		// is next stage
		const level: G.Level | null = this.level(levelId)
		if (!level) {
			throw new Error('Level not found')
		}
		const {stages} = level
		const indexOfStage = stages.findIndex((s: G.Stage): boolean => s.id === stageId)
		if (indexOfStage === -1) {
			throw new Error('Stage not found')
		}
		if (indexOfStage < stages.length - 1) {
			// next stage
			const nextStage = stages[indexOfStage + 1]
			return {
				levelId,
				stageId: nextStage.id,
				stepId: nextStage.steps[0].id
			}
		}

		// is next level
		const levels = this.version.levels
		const indexOfLevel = levels.findIndex((l: G.Level): boolean => l.id === levelId)
		if (indexOfLevel === -1) {
			throw new Error('Level not found')
		}
		if (indexOfLevel < levels.length - 1) {
			const nextLevel = levels[indexOfLevel + 1]
			const nextStage = nextLevel.stages[0]
			return {
				levelId: nextLevel.id,
				stageId: nextStage.id,
				stepId: nextStage.steps[0].id,
			}
		}

		throw new Error('Could not calculate next position')
	}
}

export default Tutorial