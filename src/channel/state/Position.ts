import * as CR from 'typings'
import * as G from 'typings/graphql'

// position
class Position {
	private value: CR.Position
	constructor() {
		this.value = {
			levelId: '',
			stageId: '',
			stepId: '',
		}
	}
	public get = () => {
		return this.value
	}
	public set = (value: CR.Position) => {
		this.value = value
	}
	// calculate the current position based on the saved progress
	public setPositionFromProgress = (tutorial: G.Tutorial, progress: CR.Progress): CR.Position => {

		// tutorial already completed
		// TODO: handle start again?
		if (progress.complete) {
			return this.value
		}

		const {levels} = tutorial.version

		const lastLevelIndex: number | undefined = levels.findIndex((l: G.Level) => progress.levels[l.id])
		// TODO: consider all levels complete as progress.complete
		if (lastLevelIndex < 0 && lastLevelIndex < levels.length) {
			throw new Error('Error setting progress level')
		}
		const currentLevel: G.Level = levels[lastLevelIndex + 1]

		const {stages} = currentLevel

		const lastStageIndex: number | undefined = stages.findIndex((s: G.Stage) => progress.stages[s.id])
		if (lastStageIndex < 0 && lastStageIndex < stages.length) {
			throw new Error('Error setting progress stage')
		}
		const currentStage: G.Stage = stages[lastStageIndex + 1]

		const {steps} = currentStage

		const lastStepIndex: number | undefined = steps.findIndex((s: G.Step) => progress.steps[s.id])
		if (lastStepIndex < 0 && lastStepIndex < steps.length) {
			throw new Error('Error setting progress step')
		}
		const currentStep: G.Step = steps[lastStepIndex + 1]

		this.value = {
			levelId: currentLevel.id,
			stageId: currentStage.id,
			stepId: currentStep.id,
		}
		return this.value
	}
}

export default Position