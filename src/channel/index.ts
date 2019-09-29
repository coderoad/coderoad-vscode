import * as CR from 'typings'
import * as G from 'typings/graphql'
import * as vscode from 'vscode'

import Context from './context'
import tutorialConfig from '../actions/tutorialConfig'
import setupActions from '../actions/setupActions'
import solutionActions from '../actions/solutionActions'
import saveCommit from '../actions/saveCommit'


interface Channel {
	receive(action: CR.Action): Promise<void>
	send(action: CR.Action): Promise<void>
}

interface ChannelProps {
	postMessage: (action: CR.Action) => Thenable<boolean>
	workspaceState: vscode.Memento
	workspaceRoot: vscode.WorkspaceFolder
}


class Channel implements Channel {
	private postMessage: (action: CR.Action) => Thenable<boolean>
	private workspaceState: vscode.Memento
	private workspaceRoot: vscode.WorkspaceFolder
	private context: Context
	constructor({postMessage, workspaceState, workspaceRoot}: ChannelProps) {
		// workspaceState used for local storage
		this.workspaceState = workspaceState
		this.workspaceRoot = workspaceRoot
		this.postMessage = postMessage
		this.context = new Context(workspaceState)
	}

	// receive from webview
	public receive = async (action: CR.Action) => {
		// action may be an object.type or plain string
		const actionType: string = typeof action === 'string' ? action : action.type

		console.log('EDITOR RECEIVED:', actionType)
		switch (actionType) {
			// continue from tutorial from local storage
			case 'EDITOR_TUTORIAL_LOAD':
				const tutorial: G.Tutorial | null = this.context.tutorial.get()

				// new tutorial
				if (!tutorial || !tutorial.id || !tutorial.version) {
					this.send({type: 'NEW_TUTORIAL'})
					return
				}

				// set tutorial 
				const {position, progress} = await this.context.setTutorial(this.workspaceState, tutorial)

				if (progress.complete) {
					// tutorial is already complete
					this.send({type: 'NEW_TUTORIAL'})
					return
				}

				// communicate to client the tutorial & stepProgress state
				this.send({type: 'CONTINUE_TUTORIAL', payload: {tutorial, progress, position}})

				return
			// clear tutorial local storage
			case 'TUTORIAL_CLEAR':
				// clear current progress/position/tutorial
				this.context.reset()
				return
			// configure test runner, language, git
			case 'EDITOR_TUTORIAL_CONFIG':
				const tutorialData = action.payload.tutorial
				this.context.setTutorial(this.workspaceState, tutorialData)
				tutorialConfig({
					tutorial: tutorialData,
					// must await async git setup or commit loading fails
					onComplete: () => this.send({type: 'TUTORIAL_CONFIGURED'})
				})
				return
			case 'EDITOR_TUTORIAL_CONTINUE_CONFIG':
				const tutorialContinue: G.Tutorial | null = this.context.tutorial.get()
				if (!tutorialContinue) {
					throw new Error('Invalid tutorial to continue')
				}
				tutorialConfig({
					tutorial: tutorialContinue,
					alreadyConfigured: true
				})
				return
			case 'EDITOR_SYNC_PROGRESS':
				// sync client progress on server
				this.context.position.set(action.payload.position)
				this.context.progress.set(action.payload.progress)
				return
			// load step actions (git commits, commands, open files)
			case 'SETUP_ACTIONS':
				vscode.commands.executeCommand('coderoad.set_current_step', action.payload)
				setupActions(this.workspaceRoot, action.payload)
				return
			// load solution step actions (git commits, commands, open files)
			case 'SOLUTION_ACTIONS':
				await solutionActions(this.workspaceRoot, action.payload)
				// run test following solution to update position
				vscode.commands.executeCommand('coderoad.run_test', action.payload)
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
				const progress = this.context.progress.setStepComplete(action.payload.stepId)
				const tutorial = this.context.tutorial.get()
				if (!tutorial) {
					throw new Error('Error with current tutorial')
				}
				this.context.position.setPositionFromProgress(tutorial, progress)
				saveCommit()
		}

		const success = await this.postMessage(action)
		if (!success) {
			throw new Error(`Message post failure: ${JSON.stringify(action)}`)
		}
	}

}

export default Channel

