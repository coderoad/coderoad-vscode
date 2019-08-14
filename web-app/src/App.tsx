import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import * as CR from 'typings'

import client from './services/apollo'
import Debugger from './components/Debugger'
import Routes from './Routes'
import DataContext, { initialData, initialState } from './utils/DataContext'
import { send } from './utils/vscode'

interface ReceivedEvent {
  data: CR.Action
}

const App = () => {
  const [state, setState] = React.useState(initialState)
  const [data, setData]: [CR.MachineContext, (data: CR.MachineContext) => void] = React.useState(initialData)

  // update state based on response from editor
  const handleEvent = (event: ReceivedEvent): void => {
    const message = event.data
    // messages from core
    if (message.type === 'SET_STATE') {
      setState(message.payload.state)
      setData(message.payload.data)
    } else if (message.type === 'SET_DATA') {
      setData(message.payload.data)
    }
  }

  // event bus listener
  React.useEffect(() => {
    const listener = 'message'
    window.addEventListener(listener, handleEvent)
    return () => {
      window.removeEventListener(listener, handleEvent)
    }
  })

  // trigger progress when webview loaded
  React.useEffect(() => {
    send('WEBVIEW_LOADED')
  })

  const value = {
    state,
    position: data.position,
    data: data.data,
    progress: data.progress,
  }

  // TODO: refactor cond to user <Router><Route> and accept first route as if/else if
  return (
    <ApolloProvider client={client}>
      <DataContext.Provider value={value}>
        <div>
          {process.env.REACT_APP_DEBUG && <Debugger value={value} />}
          <Routes state={state} />
        </div>
      </DataContext.Provider>
    </ApolloProvider>
  )
}

export default App
