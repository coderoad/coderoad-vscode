// NOTE: codesmell - importing machine
import {machine} from '../../extension'
import {TutorialModel} from '../../services/tutorial'
import * as CR from 'typings'
import * as G from 'typings/graphql'
import * as git from '../../services/git'


export default (editorDispatch: CR.EditorDispatch, tutorialModel: TutorialModel) => ({
	createWebview() {
		editorDispatch('coderoad.open_webview')
	},
	async newOrContinue() {
		// verify that the user has an existing tutorial to continue
		const hasExistingTutorial: boolean = await tutorialModel.hasExisting()

		// verify git is setup with a coderoad remote
		const [hasGit, hasGitRemote] = await Promise.all([
			git.gitVersion(),
			git.gitCheckRemoteExists(),
		])

		const canContinue = !!(hasExistingTutorial && hasGit && hasGitRemote)

		// TODO: may need to clean up git remote if no existing tutorial

		machine.send(canContinue ? 'CONTINUE' : 'NEW')
	},
	async tutorialLaunch() {
		const tutorialId: string = '1'
		// TODO: load tutorialId
		await tutorialModel.launch(tutorialId)

		// git setup
		const repo: G.TutorialRepo = tutorialModel.repo

		console.log('launch tutorial')

		await git.gitInitIfNotExists()

		if (!repo || !repo.uri) {
			throw new Error('Tutorial repo uri not found')
		}

		await git.gitSetupRemote(repo.uri)

		machine.send('TUTORIAL_LOADED')
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
		git.gitSaveCommit(tutorialModel.position)
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
		const level: G.Level = tutorialModel.level()
		// run level setup if it exists
		if (level && level.setup) {
			git.gitLoadCommits(level.setup, editorDispatch)
		}
	},
	stageLoadNext() {
		console.log('stageLoadNext')
		tutorialModel.nextPosition()
	},
	loadStage(): void {
		const stage: G.Stage = tutorialModel.stage()

		// run level setup if it exists
		if (stage && stage.setup) {
			git.gitLoadCommits(stage.setup, editorDispatch)
		}
	},
	// @ts-ignore
	// updatePosition: assign({
	// 	position: () => calculatePosition({
	// 		data: context.data,
	// 		progress: context.progress,
	// 	}),
	// }),
	stepLoadCommits(): void {
		const step: G.Step = tutorialModel.step()
		git.gitLoadCommits(step.setup, editorDispatch)
	},
})
