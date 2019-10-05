import {assign, send} from 'xstate'
import * as G from 'typings/graphql'
import * as CR from 'typings'
import * as selectors from '../../selectors'

export default {
	setEnv: assign({
		env: (context: CR.MachineContext, event: CR.MachineEvent) => {
			return event.payload.env
		}
	}),
	continueTutorial: assign({
		tutorial: (context: CR.MachineContext, event: CR.MachineEvent) => {
			return event.payload.tutorial
		},
		progress: (context: CR.MachineContext, event: CR.MachineEvent) => {
			return event.payload.progress
		},
		position: (context: CR.MachineContext, event: CR.MachineEvent) => {
			return event.payload.position
		},
	}),
	newTutorial: assign({
		tutorial: (context: CR.MachineContext, event: CR.MachineEvent): any => {
			return event.payload.tutorial
		},
		progress: (): CR.Progress => {
			return {levels: {}, stages: {}, steps: {}, complete: false}
		}
	}),
	initTutorial: assign({
		// loads complete tutorial
		tutorial: (context: CR.MachineContext, event: CR.MachineEvent): any => {
			return event.payload.tutorial
		},
	}),
	// @ts-ignore
	initPosition: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Position => {
			const position: CR.Position = selectors.initialPosition(event.payload)
			return position
		},
	}),
	// @ts-ignore
	updateStepPosition: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Position => {

			// TODO: calculate from progress

			const {position} = context
			// merge in the updated position
			// sent with the test to ensure consistency
			const stage: G.Stage = selectors.currentStage(context)
			const steps: G.Step[] = stage.steps

			// final step but not completed
			if (steps[steps.length - 1].id === position.stepId) {
				return position
			}

			const stepIndex = steps.findIndex((s: G.Step) => s.id === position.stepId)

			const step: G.Step = steps[stepIndex + 1]

			const nextPosition: CR.Position = {
				...position,
				stepId: step.id
			}

			return nextPosition
		},
	}),
	// @ts-ignore
	updateStagePosition: assign({
		position: (context: CR.MachineContext): CR.Position => {
			const {position} = context

			const level: G.Level = selectors.currentLevel(context)
			const stages: G.Stage[] = level.stages

			const stageIndex = stages.findIndex((s: G.Stage) => s.id === position.stageId)
			const stage: G.Stage = stages[stageIndex + 1]

			const nextPosition: CR.Position = {
				...position,
				stageId: stage.id,
				stepId: stage.steps[0].id,
			}

			return nextPosition
		},
	}),
	// @ts-ignore
	updateLevelPosition: assign({
		position: (context: CR.MachineContext): CR.Position => {
			const {position} = context
			const version = selectors.currentVersion(context)
			// merge in the updated position
			// sent with the test to ensure consistency
			const levels: G.Level[] = version.levels

			const levelIndex = levels.findIndex((l: G.Level) => l.id === position.levelId)
			const level: G.Level = levels[levelIndex + 1]

			const nextPosition: CR.Position = {
				levelId: level.id,
				stageId: level.stages[0].id,
				stepId: level.stages[0].steps[0].id,
			}

			return nextPosition
		},
	}),
	// @ts-ignore
	updateStepProgress: assign({
		progress: (context: CR.MachineContext, event: CR.MachineEvent): CR.Progress => {
			// update progress by tracking completed
			const currentProgress: CR.Progress = context.progress

			const {stepId} = event.payload

			currentProgress.steps[stepId] = true

			return currentProgress
		},
	}),
	// @ts-ignore
	updateStageProgress: assign({
		progress: (context: CR.MachineContext, event: CR.MachineEvent): CR.Progress => {
			// update progress by tracking completed
			const {progress, position} = context

			const stageId: string = position.stageId

			progress.stages[stageId] = true

			return progress
		},
	}),
	// @ts-ignore
	updatePosition: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Progress => {
			const {position} = event.payload
			return position
		}
	}),
	loadNext: send((context: CR.MachineContext): CR.Action => {
		const {position, progress} = context

		const version = selectors.currentVersion(context)
		const level = selectors.currentLevel(context)
		const stage = selectors.currentStage(context)

		const steps: G.Step[] = stage.steps

		const stepIndex = steps.findIndex((s: G.Step) => s.id === position.stepId)
		const stepComplete = progress.steps[position.stepId]
		const finalStep = (stepIndex > -1 && stepIndex === steps.length - 1)
		const hasNextStep = (!finalStep && !stepComplete)


		// NEXT STEP
		if (hasNextStep) {
			const nextPosition = {...position, stepId: steps[stepIndex + 1].id}
			return {type: 'NEXT_STEP', payload: {position: nextPosition}}
		}

		// has next stage?

		const {stages} = level
		const stageIndex = stages.findIndex((s: G.Stage) => s.id === position.stageId)
		const finalStage = (stageIndex > -1 && stageIndex === stages.length - 1)
		const hasNextStage = (!finalStage)

		// NEXT STAGE
		if (hasNextStage) {
			const nextStage = stages[stageIndex + 1]
			const nextPosition = {
				levelId: position.levelId,
				stageId: nextStage.id,
				stepId: nextStage.steps[0].id,
			}
			return {type: 'NEXT_STAGE', payload: {position: nextPosition}}
		}

		// has next level?

		const {levels} = version
		const levelIndex = levels.findIndex((l: G.Level) => l.id === position.levelId)
		const finalLevel = (levelIndex > -1 && levelIndex === levels.length - 1)
		const hasNextLevel = (!finalLevel)

		// NEXT LEVEL
		if (hasNextLevel) {
			const nextLevel = levels[levelIndex + 1]
			const nextStage = nextLevel.stages[0]
			const nextPosition = {
				levelId: nextLevel.id,
				stageId: nextStage.id,
				stepId: nextStage.steps[0].id,
			}
			return {type: 'NEXT_LEVEL', payload: {position: nextPosition}}
		}

		// COMPLETED
		return {type: 'COMPLETED'}
	}),
	stepNext: send((context: CR.MachineContext): CR.Action => {
		const {position, progress} = context

		const stage: G.Stage = selectors.currentStage(context)

		const {steps} = stage
		// TODO: verify not -1
		const stepIndex = steps.findIndex((s: G.Step) => s.id === position.stepId)
		const finalStep = stepIndex === steps.length - 1
		const stepComplete = progress.steps[position.stepId]
		// not final step, or final step but not complete
		const hasNextStep = !finalStep || !stepComplete

		if (hasNextStep) {
			const nextStep = steps[stepIndex + 1]
			return {
				type: 'LOAD_NEXT_STEP',
				payload: {
					step: nextStep
				}
			}
		} else {
			return {
				type: 'STAGE_COMPLETE'
			}
		}
	}),
	reset: assign({
		tutorial() {
			return null
		},
		progress(): CR.Progress {
			const progress: CR.Progress = selectors.defaultProgress()
			return progress
		},
		position(): CR.Position {
			const position: CR.Position = selectors.defaultPosition()
			return position
		}
	})
}