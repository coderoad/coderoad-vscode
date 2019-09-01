import * as React from 'react'
import { ApolloProvider, useMutation } from '@apollo/react-hooks'
import * as CR from 'typings'

import client from './services/apollo'
import { SET_STATUS } from './services/apollo/mutations'
import Debugger from './components/Debugger'
import Routes from './Routes'
import { send } from './utils/vscode'

interface ReceivedEvent {
  data: CR.Action
}

const App = () => {
  const initialState = 'Start.Initial'

  // set state machine state
	const [state, setState] = React.useState(initialState)
	const [debuggerInfo, setDebuggerInfo] = React.useState({
		progress: { levels: {}, stages: {}, steps: {}, complete: false},
		position: { levelId: '', stageId: '', stepId: ''},
	})
	
	// update level/stage/step status based on user progress & position
		// TODO: model server more efficiently
		const [setStatus] = useMutation(SET_STATUS)

  // event bus listener
  React.useEffect(() => {
		// update state based on response from editor
		const handleEvent = (event: ReceivedEvent): void => {
			const message = event.data
			// messages from core
	
			if (message.type === 'SET_STATE') {
				// SET_STATE - set state machine state
				setState(message.payload.state)

			} else if (message.type === 'SET_DATA') {
				// SET_DATA - set state machine context
				const { progress, position } = message.payload.data
				if (process.env.REACT_APP_DEBUG) {
					console.log(`Position: ${position.levelId}/${position.stageId}/${position.stepId}`)
					setDebuggerInfo({ progress, position })
				}
				setStatus({ variables: { progress, position } })
			}
		}

    const listener = 'message'
    window.addEventListener(listener, handleEvent)
    return () => {
      window.removeEventListener(listener, handleEvent)
    }
  }, [])

  // trigger progress when webview loaded
  React.useEffect(() => {
    send('WEBVIEW_LOADED')
  }, [])

  // TODO: refactor cond to user <Router><Route> and accept first route as if/else if
  return (
    <ApolloProvider client={client}>
      <div>
        {process.env.REACT_APP_DEBUG && <Debugger state={state} {...debuggerInfo} />}
        <Routes state={state} />
      </div>
    </ApolloProvider>
  )
}

export default App
