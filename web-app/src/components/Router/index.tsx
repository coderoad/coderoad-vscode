import * as React from 'react'
import * as CR from 'typings'
import { createMachine } from '../../services/state/machine'
import { useMachine } from '../../services/xstate-react'
import debuggerWrapper from '../Debugger/debuggerWrapper'
import Route from './Route'
import onError from '../../services/sentry/onError'

interface Props {
  children: any
}

interface CloneElementProps {
  context: CR.MachineContext
  send(action: CR.Action): void
}

declare let acquireVsCodeApi: any

const editor = acquireVsCodeApi()

// router finds first state match of <Route path='' />
const Router = ({ children }: Props): React.ReactElement<CloneElementProps> | null => {
  const [state, send] = useMachine(createMachine({ editorSend: editor.postMessage }))

  // event bus listener
  React.useEffect(() => {
    const listener = 'message'
    window.addEventListener(listener, send)
    return () => {
      window.removeEventListener(listener, send)
    }
  }, [])

  const childArray = React.Children.toArray(children)
  for (const child of childArray) {
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
