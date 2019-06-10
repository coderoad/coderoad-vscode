import * as React from 'react'
import { Button } from '@alifd/next'
import Cond from '../../components/Cond'
import DataContext from '../../utils/DataContext'
import { send } from '../../utils/vscode'

interface Props {
  onNew(tutorialId: string): void
}

export const NewPage = (props: Props) => {
  const { state } = React.useContext(DataContext)
  const [tutorialList, setTutorialList] = React.useState([{ id: '1', title: 'Demo', description: 'A basic demo' }])
  // context
  return (
    <div>
      <Cond state={state} path="SelectTutorial.NewTutorial.SelectTutorial">
        <div>
          <h2>Start a new Project</h2>
          {tutorialList.map(tutorial => (
            <div>
              <h3>{tutorial.title}</h3>
              <p>{tutorial.description}</p>
              <Button onClick={() => props.onNew(tutorial.id)}>Start</Button>
            </div>
          ))}
        </div>
      </Cond>
      <Cond state={state} path='SelectTutorial.NewTutorial.InitializeTutorial'>
            <div>Initializing tutorial...</div>
      </Cond>
    </div>
  )
}

export default () => <NewPage onNew={() => send('TUTORIAL_START')} />
