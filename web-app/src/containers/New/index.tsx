import * as React from 'react'
import { Button } from '@alifd/next'

interface Props {
  onNew(tutorialId: string): void
}

const NewPage = (props: Props) => {
  const [tutorialList, setTutorialList] = React.useState([{ id: '1', title: 'Demo', description: 'A basic demo' }])
  // context
  return (
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
  )
}

export default NewPage
