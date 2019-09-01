import {machine} from '../../extension'
import {TutorialModel} from '../../services/tutorial'
import * as CR from 'typings'
import * as G from 'typings/graphql'


export default (tutorialModel: TutorialModel, editorDispatch: CR.EditorDispatch) => ({
	createWebview() {
		editorDispatch('coderoad.open_webview')
	},
	async newOrContinue() {
		// verify that the user has an existing tutorial to continue
		const hasExistingTutorial: boolean = await tutorialModel.hasExisting()
		machine.send(hasExistingTutorial ? 'CONTINUE' : 'NEW')
	},
	testRunnerSetup() {
		const codingLanguage: G.EnumCodingLanguage = tutorialModel.config.codingLanguage
		editorDispatch('coderoad.test_runner_setup', codingLanguage)
	},
	initializeNewTutorial: () => {
		console.log('initializeNewTutorial')
	},
	tutorialContinue() {
		console.log('tutorial continue')
	},
	// tutorialContinue: assign({
	// 	// load initial data, progress & position
	// 	data(): CR.TutorialData {
	// 		console.log('ACTION: tutorialLoad.data')
	// 		if (!currentTutorial) {
	// 			throw new Error('No Tutorial loaded')
	// 		}
	// 		return currentTutorial.data
	// 	},
	// 	progress(): CR.Progress {
	// 		console.log('ACTION: tutorialLoad.progress')
	// 		return currentProgress
	// 	},
	// 	position(context: any): CR.Position {
	// 		console.log('ACTION: tutorialLoad.position')
	// 		if (!currentTutorial) {
	// 			throw new Error('No Tutorial loaded')
	// 		}
	// 		const {data} = currentTutorial
	// 		const position = calculatePosition({data, progress: currentProgress})

	// 		console.log('position', position)
	// 		return position
	// 	},
	// }),
	testStart() {
		editorDispatch('coderoad.run_test')
	},
	testPass(): void {
		editorDispatch('coderoad.test_pass')
		// git.gitSaveCommit(tutorialModel.position)
	},
	testFail() {
		editorDispatch('coderoad.test_fail')
	},
	// @ts-ignore
	progressUpdate() {
		tutorialModel.updateProgress()
		tutorialModel.nextPosition()
	},

	// assign({
	// 	progress: (): CR.Progress => {

	// 		console.log('progress update')
	// 		const {progress, position, data} = context
	// 		const nextProgress = progress

	// 		nextProgress.steps[position.stepId] = true
	// 		const {stepList} = data.stages[position.stageId]
	// 		const stageComplete = stepList[stepList.length - 1] === position.stepId
	// 		if (stageComplete) {
	// 			nextProgress.stages[position.stageId] = true
	// 			const {stageList} = data.levels[position.levelId]
	// 			const levelComplete = stageList[stageList.length - 1] === position.stageId
	// 			if (levelComplete) {
	// 				nextProgress.levels[position.levelId] = true
	// 				const {levelList} = data.summary
	// 				const tutorialComplete = levelList[levelList.length - 1] === position.levelId
	// 				if (tutorialComplete) {
	// 					nextProgress.complete = true
	// 				}
	// 			}
	// 		}
	// 		console.log('progress update', nextProgress)
	// 		storage.setProgress(nextProgress)
	// 		return nextProgress
	// 	},
	// }),
	// stepLoadNext: assign({
	// 	position: (context: any): CR.Position => {
	// 		const {data, position} = context
	// 		const {stepList} = data.stages[position.stageId]
	// 		const currentStepIndex = stepList.indexOf(position.stepId)

	// 		const nextStepId = currentStepIndex < stepList.length ? stepList[currentStepIndex + 1] : position.stepId

	// 		const nextPosition = {
	// 			...context.position,
	// 			stepId: nextStepId,
	// 		}

	// 		return nextPosition
	// 	},
	// }),
	loadLevel(): void {
		tutorialModel.triggerCurrent('LEVEL')
	},
	stageLoadNext() {
		console.log('stageLoadNext')
		tutorialModel.nextPosition()
	},
	loadStage(): void {
		tutorialModel.triggerCurrent('STAGE')
	},
	// @ts-ignore
	// updatePosition: assign({
	// 	position: () => calculatePosition({
	// 		data: context.data,
	// 		progress: context.progress,
	// 	}),
	// }),
	stepLoadCommits(): void {
		tutorialModel.triggerCurrent('STEP')
	},
})
