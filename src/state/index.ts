import { interpret, Interpreter } from 'xstate'
import * as CR from 'typings'
import machine from './machine'
import * as vscode from 'vscode'

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
                console.log('onTransition', state)
                if (state.changed) {
                    console.log('next state')
                    console.log(state.value)
                    vscode.commands.executeCommand('coderoad.send_state', { state: state.value, data: state.context })
                } else {
                    vscode.commands.executeCommand('coderoad.send_data', { data: state.context })
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
    send(action: string | CR.Action) {
        this.service.send(action)
    }
}

export default StateMachine
