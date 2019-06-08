import { interpret } from 'xstate'
import machine from './machine'

const machineOptions = {
    logger: console.log,
    devTools: true,
    deferEvents: true,
    execute: true
}
// machine interpreter
// https://xstate.js.org/docs/guides/interpretation.html
const service = interpret(machine, machineOptions)
    // logging
    .onTransition(state => {
        console.log('state', state)
        if (state.changed) {
            console.log('transition')
            console.log(state.value)
        }
    })

export function activate() {
    // initialize
    service.start()
}

export function deactivate() {
    service.stop()
}

export default service
