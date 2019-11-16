import * as React from 'react'
import Debugger from './index'
import stateToString from './stateToString'

const SHOW_DEBUGGER = JSON.parse(process.env.REACT_APP_DEBUG || 'false')

const debuggerWrapper = (element: React.ReactElement, state: any) => {
  if (SHOW_DEBUGGER) {
    return (
      <Debugger state={stateToString(state.value)} {...state.context}>
        {element}
      </Debugger>
    )
  }
  return element
}

export default debuggerWrapper
