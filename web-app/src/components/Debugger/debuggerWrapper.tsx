import * as React from 'react'
import Debugger from './index'
import stateToString from './stateToString'

const debuggerWrapper = (element: React.ReactElement, state: any) => {
	if (process.env.REACT_APP_DEBUG) {
		return (
			<Debugger state={stateToString(state.value)} {...state.context}>
				{element}
			</Debugger>
		)
	}
	return element
}

export default debuggerWrapper
