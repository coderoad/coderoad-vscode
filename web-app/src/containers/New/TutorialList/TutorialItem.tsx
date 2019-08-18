import * as React from 'react'
import { Button } from '@alifd/next'

interface Props {
  title?: string
  text?: string
  onNew(): void
}

const TutorialItem = (props: Props) => (
  <div>
    <h3>{props.title || 'Title'}</h3>
    <p>{props.text || 'Description'}</p>
    <Button onClick={props.onNew}>Start</Button>
  </div>
)

export default TutorialItem
