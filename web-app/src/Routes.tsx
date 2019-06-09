import * as React from 'react'
import * as CR from 'typings'
import { send } from './utils/vscode'

import NewPage from './components/New'
import ContinuePage from './components/Continue'
import Cond from './components/Cond'

interface ReceivedEvent {
    data: CR.Action
}

const Routes = () => {
    const [state, setState] = React.useState({ SelectTutorial: 'Initial' })
    const [data, setData] = React.useState({})


    const handleEvent = (event: ReceivedEvent): void => {
        const message = event.data
        console.log('RECEIVED')
        console.log(message)
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

    // TODO: refactor cond to user <Router><Route> and accept first route as if/else if
    return (
      <div>
        <h5>state: {JSON.stringify(state)}</h5>
        <p>data:{JSON.stringify(data)}</p>
        <Cond state={state} path="SelectTutorial.NewTutorial">
          <NewPage onNew={() => send('TUTORIAL_START')} />
        </Cond>
        <Cond state={state} path="SelectTutorial.ContinueTutorial">
          <ContinuePage onContinue={() => console.log('continue!')} tutorials={[]} />
        </Cond>
      </div>
    )
}

export default Routes