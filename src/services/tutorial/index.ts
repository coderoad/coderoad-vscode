import * as G from 'typings/graphql'
import * as CR from 'typings'

interface TutorialConfig {
	codingLanguage: G.EnumCodingLanguage
	testRunner: G.EnumTestRunner
}

class Tutorial {
	public repo: G.TutorialRepo
	public config: TutorialConfig
	private version: G.TutorialVersion
	private position: CR.Position
	private progress: CR.Progress

	constructor() {
		// initialize types, will be assigned when tutorial is selected
		this.repo = {} as G.TutorialRepo
		this.config = {} as TutorialConfig
		this.version = {} as G.TutorialVersion
		this.position = {} as CR.Position
		this.progress = {} as CR.Progress
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

		// set position, progress, tutorial locally
	}
	public load = (tutorial: G.Tutorial) => {
		// TODO: load from localStorage
	}
	public level = (levelId: string): G.Level | null => {
		const level: G.Level | undefined = this.version.levels.find((l: G.Level) => l.id === levelId)
		if (!level) {
			console.warn(`LevelId not found: ${levelId}`)
			return null
		}
		return level
	}
	public stage = (stageId: string): G.Stage | null => {
		const level: G.Level | null = this.level(this.position.levelId)
		if (!level) {
			return null
		}
		const stage: G.Stage | undefined = level.stages.find((s: G.Stage) => s.id === stageId)
		if (!stage) {
			console.warn(`StageId not found: ${stageId}`)
			return null
		}
		return stage
	}
	public step = (stepId: string): G.Step | null => {
		const stage: G.Stage | null = this.stage(this.position.stageId)
		if (!stage) {
			return null
		}
		const step: G.Step | undefined = stage.steps.find((s: G.Step) => s.id === stepId)
		if (!step) {
			console.warn(`StepId not found: ${stepId}`)
			return null
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