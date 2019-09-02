import {interpret, Interpreter} from 'xstate'
import * as CR from 'typings'
import machine from './machine'
import stateToString from './utils/stateToString'

// machine interpreter
// https://xstate.js.org/docs/guides/interpretation.html

class StateMachine {
	private machineOptions = {
		devTools: true,
		deferEvents: true,
		execute: true,
	}
	private service: Interpreter<{}, CR.MachineStateSchema, CR.MachineEvent>

	constructor() {
		// format state as a string and send it to the client
		this.syncState = (state: any): void => {
			const stateValue: string = stateToString(state.value)
			console.log(`STATE: ${stateValue}`)
			// editorDispatch('coderoad.send_state', {state: stateValue})
		}

		// callback on all state changes
		this.service = interpret(machine, this.machineOptions)
			// logging
			.onTransition(state => {
				if (state.changed) {
					this.syncState(state)
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
		this.syncState(this.service.state)
	}
	public send(action: string | CR.Action) {
		this.service.send(action)
	}
	// @ts-ignore
	private syncState(state: any): void

}

export default new StateMachine()
