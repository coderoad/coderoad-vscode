import { interpret } from 'xstate'
import machine from './machine'


const createStateMachine = () => {
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
    // initialize
    service.start()
    return service
}

export default createStateMachine
