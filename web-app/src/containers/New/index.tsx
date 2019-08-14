import * as React from 'react'
import { Button } from '@alifd/next'

import Cond from '../../components/Cond'
import DataContext from '../../utils/DataContext'
import { send } from '../../utils/vscode'
import { useQuery } from '@apollo/react-hooks'
import query from './query'

import LoadingPage from '../../containers/LoadingPage'

interface Props {
  state: any
  tutorialList: any[]
  onNew(tutorialId: string): void
}

export const NewPage = (props: Props) => (
  <div>
    <Cond state={props.state} path="SelectTutorial.NewTutorial.SelectTutorial">
      <div>
        <h2>Start a new Project</h2>
        {props.tutorialList.map(tutorial => (
          <div>
            <h3>{tutorial.title}</h3>
            <p>{tutorial.description}</p>
            <Button onClick={() => props.onNew(tutorial.id)}>Start</Button>
          </div>
        ))}
      </div>
    </Cond>
    <Cond state={props.state} path="SelectTutorial.NewTutorial.InitializeTutorial">
      <LoadingPage text="Launching Tutorial..." />
    </Cond>
  </div>
)

export default () => {
  console.log('load new')
  const { state } = React.useContext(DataContext)
  const { data, loading, error } = useQuery(query)
  const [tutorialList] = React.useState([{ id: '1', title: 'Demo', description: 'A basic demo' }])
  console.log('data', data)
  if (loading) {
    return null
  }

  if (error) {
    return <div>'Error'</div>
  }

  return <NewPage onNew={() => send('TUTORIAL_START')} state={state} tutorialList={tutorialList} />
}
