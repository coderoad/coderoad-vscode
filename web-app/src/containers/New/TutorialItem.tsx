import * as React from 'react'
import Button from '../../components/Button'
import Card from '../../components/Card'

interface Props {
  title: string
  description: string
  onContinue(): void
}

const TutorialItem = (props: Props) => {
  return (
    <Card>
      <div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <Button onClick={props.onContinue}>Resume</Button>
      </div>
    </Card>
  )
}

export default TutorialItem
