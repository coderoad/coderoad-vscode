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
  const initialState = { SelectTutorial: 'Initial ' }

  // set state machine state
  const [state, setState] = React.useState(initialState)

  // update level/stage/step status based on user progress & position
  // TODO: model server more effeciently
  const [setStatus] = useMutation(SET_STATUS)

  // update state based on response from editor
  const handleEvent = (event: ReceivedEvent): void => {
    const message = event.data
    // messages from core
    const { progress, position } = message.payload.data

    if (message.type === 'SET_STATE') {
      // SET_STATE - set state machine state
      setState(message.payload.state)

      setStatus({ variables: { progress, position } })
    } else if (message.type === 'SET_DATA') {
      // SET_DATA - set state machine context
      setStatus({ variables: { progress, position } })
    }
  }

  // event bus listener
  React.useEffect(() => {
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

  const value = {
    state,
	}

	console.log(client)

  // TODO: refactor cond to user <Router><Route> and accept first route as if/else if
  return (
    <ApolloProvider client={client}>
      <div>
        {process.env.REACT_APP_DEBUG && <Debugger value={value} />}
        <Routes state={state} />
      </div>
    </ApolloProvider>
  )
}

export default App
