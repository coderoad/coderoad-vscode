import * as React from 'react'
import * as CR from 'typings'
import NewPage from './components/New'
import ContinuePage from './components/Continue'
import Cond from './components/Cond'

interface ReceivedEvent {
    data: CR.Action
}

declare var acquireVsCodeApi: any

const vscode = acquireVsCodeApi()

function send(event: string|CR.Action) {
  return vscode.postMessage(event)
}


const Routes = () => {
    const [state, setState] = React.useState({ SelectTutorial: 'Initial' })
    const handleEvent = (event: ReceivedEvent): void => {
        const message = event.data
        console.log(`RECEIVED: ${JSON.stringify(message)}`)
        // messages from core
        if (message.type === 'SET_STATE') {
            setState(message.payload)
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

    return (
      <div>
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