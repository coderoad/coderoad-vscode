import { interpret, Interpreter } from 'xstate'
import * as CR from 'typings'
import createMachine from './machine'

// machine interpreter
// https://xstate.js.org/docs/guides/interpretation.html

interface Props {
  dispatch: CR.EditorDispatch
}

class StateMachine {
  private dispatch: CR.EditorDispatch
  private machineOptions = {
    logger: console.log,
    devTools: true,
    deferEvents: true,
    execute: true,
  }
  private service: Interpreter<CR.MachineContext, CR.MachineStateSchema, CR.MachineEvent>
  constructor({ dispatch }: Props) {
    this.dispatch = dispatch
    const machine = createMachine(dispatch)
    this.service = interpret(machine, this.machineOptions)
      // logging
      .onTransition(state => {
        console.log('onTransition', state)
        if (state.changed) {
          console.log('next state')
          console.log(state.value)
          dispatch('coderoad.send_state', { state: state.value, data: state.context })
        } else {
          dispatch('coderoad.send_data', { data: state.context })
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
    const { value, context } = this.service.state
    this.dispatch('coderoad.send_state', { state: value, data: context })
  }
  public send(action: string | CR.Action) {
    this.service.send(action)
  }
}

export default StateMachine
