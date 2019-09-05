import {assign, send} from 'xstate'
import * as G from 'typings/graphql'
import * as CR from 'typings'
import * as storage from '../storage'

export default {
	setTutorial: assign({
		tutorial: (context: CR.MachineContext, event: CR.MachineEvent): any => {
			const {tutorial} = event.payload
			storage.tutorial.set(tutorial)
			return tutorial
		},
	}),
	continueTutorial: assign({
		tutorial: (context: CR.MachineContext, event: CR.MachineEvent) => event.data.payload.tutorial,
		progress: (context: CR.MachineContext, event: CR.MachineEvent) => event.data.payload.progress,
		position: (context: CR.MachineContext, event: CR.MachineEvent) => event.data.payload.position,
	}),
	// @ts-ignore
	initPosition: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Position => {
			if (!event.payload.tutorial) {
				throw new Error('Invalid tutorial')
			}

			const version: G.TutorialVersion = event.payload.tutorial.version

			const position: CR.Position = {
				levelId: version.levels[0].id,
				stageId: version.levels[0].stages[0].id,
				stepId: version.levels[0].stages[0].steps[0].id,
			}

			storage.position.set(position)

			return position
		},
	}),
	// @ts-ignore
	updateStepPosition: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Position => {
			const position: CR.Position = context.position
			// merge in the updated position
			// sent with the test to ensure consistency
			const steps: G.Step[] = context.tutorial.version
				.levels.find((l: G.Level) => l.id === position.levelId)
				.stages.find((s: G.Stage) => s.id === position.stageId)
				.steps


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

			storage.position.set(nextPosition)

			return nextPosition
		},
	}),
	// @ts-ignore
	updateStagePosition: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Position => {
			const position: CR.Position = context.position
			// merge in the updated position
			// sent with the test to ensure consistency
			const stages: G.Stage[] = context.tutorial.version
				.levels.find((l: G.Level) => l.id === position.levelId)
				.stages

			const stageIndex = stages.findIndex((s: G.Stage) => s.id === position.stageId)
			const stage: G.Stage = stages[stageIndex + 1]

			console.log('stage load next', stage.id, position.stageId)

			const nextPosition: CR.Position = {
				...position,
				stageId: stage.id,
				stepId: stage.steps[0].id,
			}

			storage.position.set(nextPosition)

			return nextPosition
		},
	}),
	// @ts-ignore
	updateLevelPosition: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Position => {
			const position: CR.Position = context.position
			// merge in the updated position
			// sent with the test to ensure consistency
			const levels: G.Level[] = context.tutorial.version.levels

			const levelIndex = levels.findIndex((l: G.Level) => l.id === position.levelId)
			const level: G.Level = levels[levelIndex + 1]

			console.log('level load next', level.id, position.levelId)

			const nextPosition: CR.Position = {
				levelId: level.id,
				stageId: level.stages[0].id,
				stepId: level.stages[0].steps[0].id,
			}

			storage.position.set(nextPosition)

			return nextPosition
		},
	}),
	// @ts-ignore
	updateStepProgress: assign({
		progress: (context: CR.MachineContext, event: CR.MachineEvent): CR.Progress => {
			// update progress by tracking completed
			const currentProgress: CR.Progress = context.progress
			const stepId = event.payload.stepId
			console.log('step progress update', stepId)

			currentProgress.steps[stepId] = true

			storage.progress.set(currentProgress)

			return currentProgress
		},
	}),
	// @ts-ignore
	updateStageProgress: assign({
		progress: (context: CR.MachineContext, event: CR.MachineEvent): CR.Progress => {
			// update progress by tracking completed
			const {progress, position} = context

			const stageId: string = position.stageId
			console.log('stage progress update', stageId)

			progress.stages[stageId] = true

			storage.progress.set(progress)

			return progress
		},
	}),
	// @ts-ignore
	updatePosition: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Progress => {
			console.log('updatePosition event', event)
			const {position} = event.payload
			return position
		}
	}),
	loadNext: send((context: CR.MachineContext): CR.Action => {
		const {tutorial, position, progress} = context

		// has next step?
		const levels: G.Level[] = tutorial.version.levels
		const level: G.Level | undefined = levels.find((l: G.Level) => l.id === position.levelId)
		if (!level) {
			throw new Error('No Level found')
		}
		const stages: G.Stage[] = level.stages
		const stage: G.Stage | undefined = stages.find((s: G.Stage) => s.id === position.stageId)
		if (!stage) {
			throw new Error('No Stage found')
		}
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
		const {tutorial, position, progress} = context
		// TODO: protect against errors
		const steps: G.Step[] = tutorial.version
			.levels.find((l: G.Level) => l.id === position.levelId)
			.stages.find((s: G.Stage) => s.id === position.stageId)
			.steps

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
	// @ts-ignore
	reset: assign({
		tutorial() {
			storage.tutorial.set(null)
			return null
		},
		progress(): CR.Progress {
			const progress: CR.Progress = {
				levels: {},
				stages: {},
				steps: {},
				complete: false
			}
			storage.progress.set(progress)
			return progress
		},
		position(): CR.Position {
			const position: CR.Position = {
				levelId: '',
				stageId: '',
				stepId: ''
			}
			storage.position.set(position)
			return position
		}
	})
}