import {assign} from 'xstate'
// NOTE: codesmell - importing machine
import {machine} from '../../extension'
import api from '../../services/api'
import * as CR from 'typings'
import * as G from 'typings/graphql'
import tutorialQuery from '@gql/tutorial'
import * as storage from '../../services/storage'
import * as git from '../../services/git'

let currentTutorial: G.Tutorial | undefined
let currentProgress: CR.Progress = {
	levels: {},
	stages: {},
	steps: {},
	complete: false,
}

const calculatePosition = ({data, progress}: {data: CR.TutorialData, progress: CR.Progress}): CR.Position => {
	const {levelList} = data.summary
	// take next incomplete level or the final step
	const levelId = levelList.find((id: string) => !progress.levels[id]) || levelList[levelList.length - 1]
	const {stageList} = data.levels[levelId]
	const stageId = stageList.find((id: string) => !progress.stages[id]) || stageList[stageList.length - 1]
	const {stepList} = data.stages[stageId]
	const stepId = stepList.find((id: string) => !progress.steps[id]) || stepList[stepList.length - 1]

	const nextPosition: CR.Position = {
		levelId,
		stageId,
		stepId,
	}

	return nextPosition
}

export default (dispatch: CR.EditorDispatch) => ({
	createWebview() {
		dispatch('coderoad.open_webview')
	},
	async newOrContinue() {
		// verify that the user has a tutorial & progress
		// verify git is setup with a coderoad remote
		const [tutorial, progress, hasGit, hasGitRemote] = await Promise.all([
			storage.getTutorial(),
			storage.getProgress(),
			git.gitVersion(),
			git.gitCheckRemoteExists(),
		])
		const canContinue = !!(tutorial && progress && hasGit && hasGitRemote)

		if (canContinue) {
			// continue
			currentTutorial = tutorial
			currentProgress = progress
		}

		machine.send(canContinue ? 'CONTINUE' : 'NEW')
	},
	async tutorialLaunch() {
		const tutorial: G.Tutorial = await api.request(tutorialQuery, {
			tutorialId: '1', // TODO: add selection of tutorial id
		})
		currentTutorial = tutorial
		console.log(tutorial)
		dispatch('coderoad.tutorial_launch', tutorial)
	},
	tutorialSetup() {
		dispatch('coderoad.tutorial_setup', currentTutorial)
	},
	initializeNewTutorial: assign({
		position: (context: any): CR.Position => {
			const {data} = context
			const levelId = data.summary.levelList[0]
			const stageId = data.levels[levelId].stageList[0]
			const stepId = data.stages[stageId].stepList[0]
			return {
				levelId,
				stageId,
				stepId,
			}
		},
	}),
	tutorialContinue: assign({
		// load initial data, progress & position
		data(): CR.TutorialData {
			console.log('ACTION: tutorialLoad.data')
			if (!currentTutorial) {
				throw new Error('No Tutorial loaded')
			}
			return currentTutorial.data
		},
		progress(): CR.Progress {
			console.log('ACTION: tutorialLoad.progress')
			return currentProgress
		},
		position(context: any): CR.Position {
			console.log('ACTION: tutorialLoad.position')
			if (!currentTutorial) {
				throw new Error('No Tutorial loaded')
			}
			const {data} = currentTutorial
			const position = calculatePosition({data, progress: currentProgress})

			console.log('position', position)
			return position
		},
	}),
	testStart() {
		dispatch('coderoad.run_test')
	},
	testPass(context: CR.MachineContext): void {
		dispatch('coderoad.test_pass')
		git.gitSaveCommit(context.position)
	},
	testFail() {
		dispatch('coderoad.test_fail')
	},
	// @ts-ignore
	progressUpdate: assign({
		progress: (context: CR.MachineContext): CR.Progress => {
			console.log('progress update')
			const {progress, position, data} = context
			const nextProgress = progress

			nextProgress.steps[position.stepId] = true
			const {stepList} = data.stages[position.stageId]
			const stageComplete = stepList[stepList.length - 1] === position.stepId
			if (stageComplete) {
				nextProgress.stages[position.stageId] = true
				const {stageList} = data.levels[position.levelId]
				const levelComplete = stageList[stageList.length - 1] === position.stageId
				if (levelComplete) {
					nextProgress.levels[position.levelId] = true
					const {levelList} = data.summary
					const tutorialComplete = levelList[levelList.length - 1] === position.levelId
					if (tutorialComplete) {
						nextProgress.complete = true
					}
				}
			}
			console.log('progress update', nextProgress)
			storage.setProgress(nextProgress)
			return nextProgress
		},
	}),
	stepLoadNext: assign({
		position: (context: any): CR.Position => {
			const {data, position} = context
			const {stepList} = data.stages[position.stageId]
			const currentStepIndex = stepList.indexOf(position.stepId)

			const nextStepId = currentStepIndex < stepList.length ? stepList[currentStepIndex + 1] : position.stepId

			const nextPosition = {
				...context.position,
				stepId: nextStepId,
			}

			return nextPosition
		},
	}),
	loadLevel(context: CR.MachineContext): void {
		const {data, position} = context
		console.log('loadLevel')
		console.log(position)
		const {levels} = data
		const level = levels[position.levelId]

		// run level setup if it exists
		if (level && level.actions && level.actions.setup) {
			git.gitLoadCommits(level.actions.setup, dispatch)
		}
	},
	stageLoadNext(context: CR.MachineContext) {
		console.log('stageLoadNext')
		const {position} = context
		console.log(position)
	},
	loadStage(context: CR.MachineContext): void {
		const {data, position} = context
		console.log('loadStage')
		console.log(position)
		const {stages} = data
		const stage = stages[position.levelId]

		// run level setup if it exists
		if (stage && stage.actions && stage.actions.setup) {
			git.gitLoadCommits(stage.actions.setup, dispatch)
		}
	},
	// @ts-ignore
	updatePosition: assign({
		position: (context: CR.MachineContext) => calculatePosition({
			data: context.data,
			progress: context.progress,
		}),
	}),
	stepLoadCommits(context: CR.MachineContext): void {
		const {data, position} = context
		const {setup} = data.steps[position.stepId].actions
		git.gitLoadCommits(setup, dispatch)
	},
})
