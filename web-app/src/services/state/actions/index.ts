// import {machine} from '../../extension'
// import {cache} from '../../services/apollo'
// import {editorDispatch} from '../../services/vscode'
// import * as CR from 'typings'
// import * as G from 'typings/graphql'
// import tutorialConfig from '../../services/apollo/queries/tutorialConfig'


export default {}

// export default {
// 	async newOrContinue() {
// 		// verify that the user has an existing tutorial to continue
// 		// const hasExistingTutorial: boolean = await tutorialModel.hasExisting()
// 		// machine.send(hasExistingTutorial ? 'CONTINUE' : 'NEW')
// 	},
// 	testRunnerSetup() {
// 		const result = cache.readQuery({query: tutorialConfig})
// 		console.log('result', result)
// 		// const codingLanguage: G.EnumCodingLanguage = result.data.codingLanguage
// 		// editorDispatch('coderoad.test_runner_setup', codingLanguage)
// 	},
// 	initializeNewTutorial: () => {
// 		console.log('initializeNewTutorial')
// 	},
// 	tutorialContinue() {
// 		console.log('tutorial continue')
// 	},
// 	testStart() {
// 		editorDispatch('coderoad.run_test')
// 	},
// 	testPass(): void {
// 		editorDispatch('coderoad.test_pass')
// 		// git.gitSaveCommit(tutorialModel.position)
// 	},
// 	testFail() {
// 		editorDispatch('coderoad.test_fail')
// 	},
// 	// @ts-ignore
// 	progressUpdate() {
// 		// tutorialModel.updateProgress()
// 		// tutorialModel.nextPosition()
// 	},
// 	loadLevel(): void {
// 		// tutorialModel.triggerCurrent('LEVEL')
// 	},
// 	stageLoadNext() {
// 		console.log('stageLoadNext')
// 		// tutorialModel.nextPosition()
// 	},
// 	loadStage(): void {
// 		// tutorialModel.triggerCurrent('STAGE')
// 	},
// 	stepLoadCommits(): void {
// 		// tutorialModel.triggerCurrent('STEP')
// 	},
// }
