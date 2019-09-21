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
}


class Channel implements Channel {
	private postMessage: (action: CR.Action) => Thenable<boolean>
	private workspaceState: vscode.Memento
	private context: Context
	constructor({postMessage, workspaceState}: ChannelProps) {
		// workspaceState used for local storage
		this.workspaceState = workspaceState
		this.postMessage = postMessage
		this.context = new Context(workspaceState)
	}

	// receive from webview
	public receive = async (action: CR.Action) => {
		const actionType: string = typeof action === 'string' ? action : action.type
		console.log('RECEIVED:', actionType)
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
				const progress: CR.Progress = await this.context.progress.setTutorial(this.workspaceState, tutorial)

				console.log('looking at stored')
				console.log(JSON.stringify(tutorial))
				console.log(JSON.stringify(progress))

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
				this.context = new Context(this.workspaceState)
				return
			// configure test runner, language, git
			case 'EDITOR_TUTORIAL_CONFIG':
				const tutorialData = action.payload.tutorial
				console.log('tutorialConfig', JSON.stringify(tutorialData))
				this.context.setTutorial(this.workspaceState, tutorialData)
				tutorialConfig(tutorialData)
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
				this.context.progress.setStepComplete(action.payload.stepId)
				saveCommit()
		}

		const success = await this.postMessage(action)
		if (!success) {
			throw new Error(`Message post failure: ${JSON.stringify(action)}`)
		}
	}

}

export default Channel

