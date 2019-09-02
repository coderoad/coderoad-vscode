import {send} from 'xstate'
import channel from '../../channel'
// import {machine} from '../../extension'
// import {cache} from '../../services/apollo'
// import {editorDispatch} from '../../services/vscode'
// import * as CR from 'typings'
// import * as G from 'typings/graphql'
// import tutorialConfig from '../../services/apollo/queries/tutorialConfig'


export default {
	newOrContinue: send((context): 'NEW' | 'CONTINUE' => {
		console.log('new or continue')

		// TODO: verify that the user has an existing tutorial to continue
		const hasExistingTutorial: boolean = false
		return hasExistingTutorial ? 'CONTINUE' : 'NEW'
	}),
	tutorialStart() {
		channel.editorSend({
			type: 'TUTORIAL_START',
			payload: {
				tutorial: {
					id: 'some-tutorial-id'
				}
			}
		})
	}
}

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
// initializeNewTutorial: assign({
// 	position: (context: any): CR.Position => {
// 		const { tutorial } = context
// 		const levelId = data.summary.levelList[0]
// 		const stageId = data.levels[levelId].stageList[0]
// 		const stepId = data.stages[stageId].stepList[0]
// 		return {
// 			levelId,
// 			stageId,
// 			stepId,
// 		}
// 	},
// })
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
