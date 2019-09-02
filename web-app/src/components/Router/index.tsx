import * as React from 'react'
import { useMachine } from '@xstate/react'
import machine from '../../services/state/machine'
import Route from './Route'

interface Props {
  state: string
  children: any
}

// const stateMatch = (state: string, path: string) => {
//   return !!(new RegExp(`^${state}`).exec(path))
// }

// router finds first state match of <Route path='' />
const Router = ({ children }: Props) => {
	const [current, send] = useMachine(machine)

  const childArray = React.Children.toArray(children)
  for (const child of childArray) {
    if (current.matches(child.props.path)) {
			if (child.props.send) {
				return React.cloneElement(child.props.children, { send })
			} else {
				return child.props.children
			}
      
    }
  }
  console.warn(`No Route matches for ${JSON.stringify(current)}`)
  return null
}

Router.Route = Route

export default Router
