import * as React from 'react'
import { Button } from '@alifd/next'

interface Props {
  onNew(tutorialId: string): void
}

const NewPage = (props: Props) => {
  // context
  return (
    <div>
      <h2>Start a new Project</h2>
      <Button onClick={() => props.onNew('1')}>New</Button>
    </div>
  )
}

export default NewPage
