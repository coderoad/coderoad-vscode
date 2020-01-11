import * as React from 'react'
import { DEBUG } from '../../environment'
import Debugger from './index'
import stateToString from './stateToString'

const debuggerWrapper = (element: React.ReactElement, state: any) => {
  if (DEBUG) {
    return (
      <Debugger state={stateToString(state.value)} {...state.context}>
        {element}
      </Debugger>
    )
  }
  return element
}

export default debuggerWrapper
