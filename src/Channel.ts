import * as CR from 'typings'
import * as G from 'typings/graphql'
import * as vscode from 'vscode'

import Storage from './services/storage'
import tutorialConfig from './actions/tutorialConfig'
import setupActions from './actions/setupActions'
import solutionActions from './actions/solutionActions'
import saveCommit from './actions/saveCommit'


interface Channel {
	receive(action: CR.Action): Promise<void>
	send(action: CR.Action): Promise<void>
}

interface ChannelProps {
	postMessage: (action: CR.Action) => Thenable<boolean>
	workspaceState: vscode.Memento
}

class Channel implements Channel {
	private postMessage: (action: CR.Action) => Thenable<boolean>
	private currentTutorial: Storage<G.Tutorial | null>
	private stepProgress: Storage<CR.StepProgress>
	private workspaceState: vscode.Memento
	constructor({postMessage, workspaceState}: ChannelProps) {
		this.postMessage = postMessage
		this.workspaceState = workspaceState

		// local storage of current tutorial for continuing tutorials
		this.currentTutorial = new Storage<G.Tutorial | null>({
			key: 'coderoad:currentTutorial',
			storage: workspaceState,
			defaultValue: null,
		})

		// initialized for consistent typings. unused
		this.stepProgress = new Storage<CR.StepProgress>({
			key: 'coderoad:stepProgress',
			storage: this.workspaceState,
			defaultValue: {}
		})
	}

	// receive from webview
	public receive = async (action: CR.Action) => {
		const actionType: string = typeof action === 'string' ? action : action.type
		console.log('RECEIVED:', actionType)
		switch (actionType) {
			// continue from tutorial from local storage
			case 'EDITOR_TUTORIAL_LOAD':
				const tutorial: G.Tutorial | null = await this.currentTutorial.get()

				// new tutorial
				if (!tutorial || !tutorial.id || !tutorial.version) {
					this.send({type: 'NEW_TUTORIAL'})
					return
				}

				// continue tutorial
				// setup progress for specific tutorial
				this.stepProgress = new Storage<CR.StepProgress>({
					key: `coderoad:stepProgress:${tutorial.id}:${tutorial.version}`,
					storage: this.workspaceState,
					defaultValue: {}
				})
				const stepProgress = await this.stepProgress.get()
				console.log('looking at stored')
				console.log(JSON.stringify(tutorial))
				console.log(JSON.stringify(stepProgress))
				const progress: CR.Progress = {
					steps: stepProgress,
					stages: {},
					levels: {},
					complete: false
				}

				const position: CR.Position = {
					stepId: '',
					stageId: '',
					levelId: '',
				}

				// calculate progress from tutorial & stepProgress
				for (const level of tutorial.version.levels) {
					for (const stage of level.stages) {
						// set stage progress
						const stageComplete: boolean = stage.steps.every((step: G.Step) => {
							return stepProgress[step.id]
						})
						if (stageComplete) {
							progress.stages[stage.id] = true
						} else if (!position.stageId.length) {
							// set stage amd step position
							position.stageId = stage.id
							// @ts-ignore
							position.stepId = stage.steps.find((step: G.Step) => !stepProgress[step.id]).id
						}
					}
					// set level progress
					const levelComplete: boolean = level.stages.every((stage: G.Stage) => {
						return progress.stages[stage.id]
					})
					if (levelComplete) {
						progress.levels[level.id] = true
					} else if (!position.levelId.length) {
						position.levelId = level.id
					}
				}
				// set tutorial progress
				progress.complete = tutorial.version.levels.every((level: G.Level) => {
					return progress.levels[level.id]
				})
				// communicate to client the tutorial & stepProgress state
				this.send({type: 'CONTINUE_TUTORIAL', payload: {tutorial, progress, position}})

				return
			// clear tutorial local storage
			case 'TUTORIAL_CLEAR':
				this.currentTutorial.set(null)

				// reset tutorial progress on clear
				this.stepProgress.set({})
				return
			// configure test runner, language, git
			case 'EDITOR_TUTORIAL_CONFIG':
				const tutorialInfo = action.payload.tutorial
				console.log('tutorialConfig', JSON.stringify(tutorialInfo))
				if (!this.stepProgress) {
					// setup progress for new tutorials
					this.stepProgress = new Storage<CR.StepProgress>({
						key: `coderoad:stepProgress:${tutorialInfo.id}:${tutorialInfo.version.version}`,
						storage: this.workspaceState,
						defaultValue: {}
					})
				}
				tutorialConfig(tutorialInfo)
				this.currentTutorial.set(tutorialInfo)
				return
			// run unit tests on step
			case 'TEST_RUN':
				vscode.commands.executeCommand('coderoad.run_test', action.payload)
				return
			// load step actions (git commits, commands, open files)
			case 'SETUP_ACTIONS':
				vscode.commands.executeCommand('coderoad.set_current_step', action.payload)
				setupActions(action.payload)
				return
			// load solution step actions (git commits, commands, open files)
			case 'SOLUTION_ACTIONS':
				solutionActions(action.payload)
				return

			default:
				console.log(`No match for action type: ${actionType}`)
				return
		}
	}
	// send to webview
	public send = async (action: CR.Action) => {

		switch (action.type) {
			case 'TEST_PASS':
				// update local storage stepProgress
				this.stepProgress.update({
					[action.payload.stepId]: true
				})
				saveCommit()
		}

		const success = await this.postMessage(action)
		if (!success) {
			throw new Error(`Message post failure: ${JSON.stringify(action)}`)
		}
	}

}

export default Channel

