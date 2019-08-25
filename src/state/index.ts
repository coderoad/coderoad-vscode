import {interpret, Interpreter} from 'xstate'
import {TutorialModel} from '../services/tutorial'
import * as CR from 'typings'
import createMachine from './machine'

// machine interpreter
// https://xstate.js.org/docs/guides/interpretation.html

// convert state into a readable string
const stateToString = (state: string | object, str: string = ''): string => {
	if (typeof state === 'object') {
		const keys = Object.keys(state)
		if (keys && keys.length) {
			const key = keys[0]
			return stateToString(state[key], str.length ? `${str}.${key}` : key)
		}
		return str
	} else if (typeof state === 'string') {
		return state
	}
	return ''
}

interface Props {
	dispatch: CR.EditorDispatch
	tutorial: TutorialModel
}

class StateMachine {
	private dispatch: CR.EditorDispatch
	private machineOptions = {
		devTools: true,
		deferEvents: true,
		execute: true,
	}
	private service: Interpreter<{}, CR.MachineStateSchema, CR.MachineEvent>
	constructor({dispatch, tutorial}: Props) {
		this.dispatch = dispatch
		const machine = createMachine(dispatch, tutorial)
		this.service = interpret(machine, this.machineOptions)
			// logging
			.onTransition(state => {
				if (state.changed) {
					console.log(`STATE: ${stateToString(state.value)}`)
					dispatch('coderoad.send_state', {state: state.value})
				}
			})
	}
	public activate() {
		// initialize
		this.service.start()
	}
	public deactivate() {
		this.service.stop()
	}
	public refresh() {
		console.log('service refresh')
		console.log(this.service.state)
		const {value} = this.service.state
		this.dispatch('coderoad.send_state', {state: value})
	}
	public send(action: string | CR.Action) {
		this.service.send(action)
	}
}

export default StateMachine
