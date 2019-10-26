import * as React from 'react'
import { Button } from '@alifd/next'

interface Props {
  title?: string
  description?: string
  onSelect(): void
}

const TutorialItem = (props: Props) => (
  <div>
    <h3>{props.title || 'Title'}</h3>
    <p>{props.description || 'Description'}</p>
    <Button onClick={props.onSelect}>Start</Button>
  </div>
)

export default TutorialItem
