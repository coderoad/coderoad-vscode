import { interpret, Interpreter } from 'xstate'
import * as CR from '../typings'
import machine from './machine'

// machine interpreter
// https://xstate.js.org/docs/guides/interpretation.html

class StateMachine {
    private machineOptions = {
        logger: console.log,
        devTools: true,
        deferEvents: true,
        execute: true
    }
    private service: Interpreter<CR.MachineContext, CR.MachineStateSchema, CR.MachineEvent>
    constructor() {
        this.service = interpret(machine, this.machineOptions)
            // logging
            .onTransition(state => {
                console.log('state', state)
                if (state.changed) {
                    console.log('transition')
                    console.log(state.value)
                }
            })
    }
    activate() {
        // initialize
        this.service.start()
    }
    deactivate() {
        this.service.stop()
    }
    onReceive(action: CR.Action) {
        console.log('RECEIVED ACTION')
        console.log(action)
    }
}

export default StateMachine
