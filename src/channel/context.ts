import * as CR from 'typings'
import * as G from 'typings/graphql'
import * as vscode from 'vscode'

import Position from './state/Position'
import Progress from './state/Progress'
import Tutorial from './state/Tutorial'

class Context {
	public tutorial: Tutorial
	public position: Position
	public progress: Progress
	constructor(workspaceState: vscode.Memento) {

		// state held in one place
		this.tutorial = new Tutorial(workspaceState)
		this.position = new Position()
		this.progress = new Progress()
	}
	setTutorial(tutorial: G.Tutorial, workspaceState: vscode.Memento) {
		this.tutorial.set(tutorial)
		this.progress.setTutorial(workspaceState, tutorial)
	}
}

export default Context