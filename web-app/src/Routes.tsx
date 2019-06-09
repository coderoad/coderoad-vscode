import * as React from 'react'
import * as CR from 'typings'

interface ReceivedEvent {
    data: CR.Action
}

const Routes = () => {
    const [state, setState] = React.useState({ SelectTutorial: 'Initial' })
    const handleEvent = (event: ReceivedEvent): void => {
        console.log('--- HANDLE EVENT ---')
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
        <div>State: {JSON.stringify(state)}</div>
    )
}

export default Routes