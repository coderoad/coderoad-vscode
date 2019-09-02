import * as React from 'react'
import * as CR from 'typings'
import { useMachine } from '@xstate/react'
import machine from '../../services/state/machine'

import Route from './Route'
import debuggerWrapper from '../Debugger/debuggerWrapper'
import messageBusReceiver from '../../services/channel/receiver'

interface Props {
  children: any
}

interface CloneElementProps {
	send(action: CR.Action): void
}

// router finds first state match of <Route path='' />
const Router = ({ children }: Props): React.ReactElement<CloneElementProps>|null => {
	const [state, send] = useMachine(machine, {
		logger: console.log.bind('XSTATE:')
	})

	// event bus listener
  React.useEffect(messageBusReceiver, [])

  const childArray = React.Children.toArray(children)
  for (const child of childArray) {
    if (state.matches(child.props.path)) {
			const element = React.cloneElement<CloneElementProps>(child.props.children, { send })
      return debuggerWrapper(element, state)
    }
  }
  console.warn(`No Route matches for ${JSON.stringify(state)}`)
  return null
}

Router.Route = Route

export default Router
