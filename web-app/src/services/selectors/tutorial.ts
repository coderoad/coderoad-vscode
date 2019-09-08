import {MachineContext} from 'typings'
import * as G from 'typings/graphql'
import {createSelector} from 'reselect'

export const currentTutorial = ({tutorial}: MachineContext): G.Tutorial => {
	if (!tutorial) {
		throw new Error('Tutorial not found')
	}
	return tutorial
}

export const currentVersion = createSelector(
	currentTutorial,
	(tutorial: G.Tutorial) => {
		if (!tutorial.version) {
			throw new Error('Tutorial version not found')
		}
		return tutorial.version
	})

export const currentLevel = (context: MachineContext): G.Level => createSelector(
	currentVersion,
	(version: G.TutorialVersion): G.Level => {
		// merge in the updated position
		// sent with the test to ensure consistency
		const levels: G.Level[] = version.levels

		const level: G.Level | undefined = levels.find((l: G.Level) => l.id === context.position.levelId)

		if (!level) {
			throw new Error('Level not found when selecting level')
		}
		return level
	})(context)

export const currentStage = (context: MachineContext): G.Stage => createSelector(
	currentLevel,
	(level: G.Level): G.Stage => {
		const stages: G.Stage[] = level.stages
		const stage: G.Stage | undefined = stages.find((s: G.Stage) => s.id === context.position.stageId)
		if (!stage) {
			throw new Error('No Stage found')
		}
		return stage
	}
)(context)

export const currentStep = (context: MachineContext): G.Step => createSelector(
	currentStage,
	(stage: G.Stage): G.Step => {
		const steps: G.Step[] = stage.steps
		const step: G.Step | undefined = steps.find((s: G.Step) => s.id === context.position.stepId)
		if (!step) {
			throw new Error('No Step found')
		}
		return step
	}
)(context)
