import {assign, send} from 'xstate'
import * as G from 'typings/graphql'
import * as CR from 'typings'
import * as selectors from '../../selectors'

export default {
	setEnv: assign({
		env: (context: CR.MachineContext, event: CR.MachineEvent) => {
			return {
				...context.env,
				...event.payload.env
			}
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
			return {levels: {}, steps: {}, complete: false}
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
			const level: G.Level = selectors.currentLevel(context)
			const steps: G.Step[] = level.steps

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
	updateLevelPosition: assign({
		position: (context: CR.MachineContext): CR.Position => {
			const {position} = context
			const version = selectors.currentVersion(context)
			// merge in the updated position
			// sent with the test to ensure consistency
			const levels: G.Level[] = version.data.levels

			const levelIndex = levels.findIndex((l: G.Level) => l.id === position.levelId)
			const level: G.Level = levels[levelIndex + 1]

			const nextPosition: CR.Position = {
				levelId: level.id,
				stepId: level.steps[0].id,
			}

			return nextPosition
		},
	}),
	// @ts-ignore
	updateLevelProgress: assign({
		progress: (context: CR.MachineContext, event: CR.MachineEvent): CR.Progress => {
			// update progress by tracking completed
			const {progress, position} = context

			const levelId: string = position.levelId

			progress.levels[levelId] = true

			return progress
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
	updatePosition: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Progress => {
			const {position} = event.payload
			return position
		}
	}),
	loadNext: send((context: CR.MachineContext): CR.Action => {
		const {position, progress} = context

		const level = selectors.currentLevel(context)

		const steps: G.Step[] = level.steps

		const stepIndex = steps.findIndex((s: G.Step) => s.id === position.stepId)
		const stepComplete = progress.steps[position.stepId]
		const finalStep = (stepIndex > -1 && stepIndex === steps.length - 1)
		const hasNextStep = (!finalStep && !stepComplete)


		// NEXT STEP
		if (hasNextStep) {
			const nextPosition = {...position, stepId: steps[stepIndex + 1].id}
			return {type: 'NEXT_STEP', payload: {position: nextPosition}}
		}

		// has next level?

		if (!context.tutorial) {
			throw new Error('Tutorial not found')
		}

		const levels = context.tutorial.version.data.levels || []
		const levelIndex = levels.findIndex((l: G.Level) => l.id === position.levelId)
		const finalLevel = (levelIndex > -1 && levelIndex === levels.length - 1)
		const hasNextLevel = (!finalLevel)

		// NEXT LEVEL
		if (hasNextLevel) {
			const nextLevel = levels[levelIndex + 1]
			const nextPosition = {
				levelId: nextLevel.id,
				stepId: nextLevel.steps[0].id,
			}
			return {type: 'NEXT_LEVEL', payload: {position: nextPosition}}
		}

		// COMPLETED
		return {type: 'COMPLETED'}
	}),
	stepNext: send((context: CR.MachineContext): CR.Action => {
		const {position, progress} = context

		const level: G.Level = selectors.currentLevel(context)

		const {steps} = level
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
				type: 'LEVEL_COMPLETE'
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