import {send} from 'xstate'
// import {machine} from '../../extension'
// import {cache} from '../../services/apollo'
// import {editorDispatch} from '../../services/vscode'
import * as CR from 'typings'
import * as G from 'typings/graphql'
// import tutorialConfig from '../../services/apollo/queries/tutorialConfig'
import editorActions from './editor'
import contextActions from './context'

export default {
	newOrContinue: send((context: CR.MachineContext): 'NEW' | 'CONTINUE' => {
		console.log('new or continue')

		// TODO: verify that the user has an existing tutorial to continue
		const hasExistingTutorial: boolean = false
		return hasExistingTutorial ? 'CONTINUE' : 'NEW'
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
	...editorActions,
	...contextActions,
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
