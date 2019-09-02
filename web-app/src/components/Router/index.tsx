import * as React from 'react'
import { useMachine } from '@xstate/react'
import machine from '../../services/state/machine'
import Debugger from '../Debugger'
import Route from './Route'
import stateToString from './stateToString'

interface Props {
  children: any
}

{/* {process.env.REACT_APP_DEBUG && <Debugger {...debuggerInfo} />} */}

const wrapDebugger = (element: React.ReactElement, state: any) => {
	if (process.env.REACT_APP_DEBUG) {
		return (
			<Debugger state={stateToString(state.value)}>
				{element}
			</Debugger>
		)
	}
	return element
}

// router finds first state match of <Route path='' />
const Router = ({ children }: Props) => {
	const [state, send] = useMachine(machine)

  const childArray = React.Children.toArray(children)
  for (const child of childArray) {
    if (state.matches(child.props.path)) {
			let element
			if (child.props.send) {
				element = React.cloneElement(child.props.children, { send })
			} else {
				element = child.props.children
			}
      return wrapDebugger(element, state)
    }
  }
  console.warn(`No Route matches for ${JSON.stringify(state)}`)
  return null
}

Router.Route = Route

export default Router
