import * as CR from 'typings'
import * as G from 'typings/graphql'

const defaultValue: CR.Position = {
	levelId: '',
	stageId: '',
	stepId: '',
}

// position
class Position {
	private value: CR.Position
	constructor() {
		this.value = defaultValue
	}
	public get = () => {
		return this.value
	}
	public set = (value: CR.Position) => {
		this.value = value
	}
	public reset = () => {
		this.value = defaultValue
	}
	// calculate the current position based on the saved progress
	public setPositionFromProgress = (tutorial: G.Tutorial, progress: CR.Progress): CR.Position => {

		// tutorial already completed
		// TODO: handle start again?
		if (progress.complete) {
			return this.value
		}

		const {levels} = tutorial.version

		const lastLevelIndex: number | undefined = levels.findIndex((l: G.Level) => !progress.levels[l.id])
		// TODO: consider all levels complete as progress.complete
		if (lastLevelIndex >= levels.length) {
			throw new Error('Error setting progress level')
		}
		const currentLevel: G.Level = levels[lastLevelIndex]

		const {stages} = currentLevel

		const lastStageIndex: number | undefined = stages.findIndex((s: G.Stage) => !progress.stages[s.id])
		if (lastStageIndex >= stages.length) {
			throw new Error('Error setting progress stage')
		}
		const currentStage: G.Stage = stages[lastStageIndex]

		const {steps} = currentStage

		const lastStepIndex: number | undefined = steps.findIndex((s: G.Step) => !progress.steps[s.id])
		if (lastStepIndex >= steps.length) {
			throw new Error('Error setting progress step')
		}
		// handle position when last step is complete but "continue" not yet selected
		const adjustedLastStepIndex = lastStepIndex === -1 ? steps.length - 1 : lastStepIndex
		const currentStep: G.Step = steps[adjustedLastStepIndex]

		this.value = {
			levelId: currentLevel.id,
			stageId: currentStage.id,
			stepId: currentStep.id,
		}
		return this.value
	}
}

export default Position