import * as React from 'react'
import { ClientEvents } from 'typings/events'
import channel from '../../services/channel'
import messageBusReceiver from '../../services/channel/receiver'
import machine from '../../services/state/machine'
import { useMachine } from '../../services/xstate-react'
import debuggerWrapper from '../Debugger/debuggerWrapper'
import Route from './Route'
import onError from '../../services/sentry/onError'
import { MachineContext } from '../../services/state/machine'

interface Props {
  children: any
}

interface CloneElementProps {
  context: MachineContext
  send(action: ClientEvents): void
}

// TODO: rewrite router, logic is messy

// router finds first state match of <Route path='' />
const Router = ({ children }: Props): React.ReactElement<CloneElementProps> | null => {
  const [state, send] = useMachine(machine, {
    interpreterOptions: {
      logger: console.log.bind('XSTATE:'),
    },
  })

  channel.setMachineSend(send)

  // event bus listener
  React.useEffect(messageBusReceiver, [])

  const childArray = React.Children.toArray(children)
  for (const child of childArray) {
    // @ts-ignore
    const { path } = child.props
    let pathMatch
    if (typeof path === 'string') {
      pathMatch = state.matches(path)
    } else if (Array.isArray(path)) {
      pathMatch = path.some(p => state.matches(p))
    } else {
      throw new Error(`Invalid route path ${JSON.stringify(path)}`)
    }
    if (pathMatch) {
      // @ts-ignore
      const element = React.cloneElement<CloneElementProps>(child.props.children, { send, context: state.context })
      return debuggerWrapper(element, state)
    }
  }
  const message = `No Route matches for ${JSON.stringify(state)}`
  onError(new Error(message))
  console.warn(message)
  return null
}

Router.Route = Route

export default Router
