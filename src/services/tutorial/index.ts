import * as G from 'typings/graphql'
import * as CR from 'typings'
import * as storage from '../storage'
import api from '../api'
import tutorialQuery from '../../services/api/gql/getTutorial'

interface TutorialConfig {
	codingLanguage: G.EnumCodingLanguage
	testRunner: G.EnumTestRunner
}

interface PositionProgress {
	position: CR.Position
	progress: CR.Progress
}

export interface TutorialModel {
	repo: G.TutorialRepo
	config: TutorialConfig
	version: G.TutorialVersion
	position: CR.Position
	progress: CR.Progress
	init(tutorial: G.Tutorial): void
	load(tutorialId: string): void
	level(levelId?: string): G.Level
	stage(stageId?: string): G.Stage
	step(stepId?: string): G.Step
	updateProgress(): PositionProgress
	nextPosition(): CR.Position
	hasExisting(): Promise<boolean>
	setClientDispatch(editorDispatch: CR.EditorDispatch): void
}

class Tutorial implements TutorialModel {
	public repo: G.TutorialRepo
	public config: TutorialConfig
	public version: G.TutorialVersion
	public position: CR.Position
	public progress: CR.Progress
	private clientDispatch: (props: PositionProgress) => void

	constructor() {
		// initialize types, will be assigned when tutorial is selected
		this.clientDispatch = (props: PositionProgress) => {
			throw new Error('Tutorial client dispatch yet initialized')
		}
		this.repo = {} as G.TutorialRepo
		this.config = {} as TutorialConfig
		this.version = {} as G.TutorialVersion
		this.position = {} as CR.Position
		this.progress = {} as CR.Progress

		// Promise.all([
		// 	storage.getTutorial(),
		// 	storage.getProgress(),
		// ]).then((data) => {
		// 	const [tutorial, progress] = data
		// 	console.log('load continue tutorial')
		// 	console.log(tutorial, progress)
		// })

	}

	public setClientDispatch(editorDispatch: CR.EditorDispatch) {
		this.clientDispatch = ({progress, position}: PositionProgress) => editorDispatch('coderoad.send_data', {progress, position})
	}

	public init = (tutorial: G.Tutorial) => {
		this.repo = tutorial.repo
		this.config = {
			codingLanguage: tutorial.codingLanguage,
			testRunner: tutorial.testRunner,
		}
		// version containing level data
		this.version = tutorial.version
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

		console.log('this.position', JSON.stringify(this.position))

		this.clientDispatch({
			position: this.position,
			progress: this.progress
		})

		// set tutorial, position, progress locally
		// TODO: base position off of progress
		Promise.all([
			storage.setTutorial(tutorial),
			storage.setPosition(this.position),
			storage.setProgress(this.progress)
		])
	}

	public async hasExisting(): Promise<boolean> {
		const [tutorial, progress] = await Promise.all([
			storage.getTutorial(),
			storage.getProgress(),
		])

		return !!(tutorial && progress)
	}

	public async load(tutorialId: string) {
		// TODO: load from localStorage
		const {tutorial}: {tutorial: G.Tutorial | null} = await api.request(tutorialQuery, {
			tutorialId, // TODO: add selection of tutorial id
		})

		if (!tutorial) {
			throw new Error(`Tutorial ${tutorialId} not found`)
		}

		await this.init(tutorial)
	}
	public level = (levelId: string): G.Level => {
		const level: G.Level | undefined = this.version.levels.find((l: G.Level) => l.id === levelId || this.position.levelId)
		if (!level) {
			throw new Error('Level not found')
		}
		return level
	}
	public stage = (stageId?: string): G.Stage => {
		const level: G.Level = this.level(this.position.levelId)
		const stage: G.Stage | undefined = level.stages.find((s: G.Stage) => s.id === stageId || this.position.stageId)
		if (!stage) {
			throw new Error('Stage not found')
		}
		return stage
	}
	public step = (stepId?: string): G.Step => {
		const stage: G.Stage = this.stage(this.position.stageId)
		const step: G.Step | undefined = stage.steps.find((s: G.Step) => s.id === stepId || this.position.stepId)
		if (!step) {
			throw new Error('Step not found')
		}
		return step
	}
	public updateProgress = (): {position: CR.Position, progress: CR.Progress} => {
		const {levelId, stageId, stepId} = this.position
		this.progress.levels[levelId] = true
		this.progress.stages[stageId] = true
		this.progress.steps[stepId] = true
		return {
			position: this.position,
			progress: this.progress,
		}
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