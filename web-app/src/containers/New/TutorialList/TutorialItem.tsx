import * as React from 'react'
import { Button } from '@alifd/next'

interface Props {
  title?: string
  text?: string
  onSelect(): void
}

const TutorialItem = (props: Props) => (
  <div>
    <h3>{props.title || 'Title'}</h3>
    <p>{props.text || 'Description'}</p>
    <Button onClick={props.onSelect}>Start</Button>
  </div>
)

export default TutorialItem
