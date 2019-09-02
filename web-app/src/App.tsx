import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import * as CR from 'typings'

import client from './services/apollo'
import currentTutorial from './services/current'
import Routes from './Routes'

interface ReceivedEvent {
  data: CR.Action
}

const App = () => {

  // event bus listener
  React.useEffect(() => {
		// update state based on response from editor
		const handleEvent = (event: ReceivedEvent): void => {
			const message = event.data
			// messages from core
	
		 if (message.type === 'SET_DATA') {
				// SET_DATA - set state machine context
				console.log('SET_DATA updated')
				const { progress, position } = message.payload
				if (process.env.REACT_APP_DEBUG) {
					console.log(`Position: ${position.levelId}/${position.stageId}/${position.stepId}`)
					// setDebuggerInfo({ progress, position })
				}
				console.log('set currentTutorial')
				currentTutorial.set({ position, progress })

			}
		}

    const listener = 'message'
    window.addEventListener(listener, handleEvent)
    return () => {
      window.removeEventListener(listener, handleEvent)
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  )
}

export default App
