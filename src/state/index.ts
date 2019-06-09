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
                console.log('onTransition', state.changed)
                if (state.changed) {
                    console.log('next state')
                    console.log(state.value)
                    vscode.commands.executeCommand('coderoad.send_state', state.value)
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
        console.log('machine.send')
        console.log(action)
        this.service.send(action)
    }
    onReceive(action: string | CR.Action) {
        console.log(action)
        this.service.send(action)
    }
}

export default StateMachine
