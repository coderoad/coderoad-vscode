import * as React from 'react'
import CR from '../../../../src/typings'

import ContinueItem from './ContinueItem'

interface Props {
  tutorials: CR.Tutorial[]
  onContinue(tutorialId: string): void
  // onReset(): void
}

const ContinuePage = (props: Props) => {
  return (
    <div>
      {props.tutorials.map((tutorial: CR.Tutorial) => (
        <ContinueItem
          key={tutorial.id}
          onContinue={() => props.onContinue(tutorial.id)}
          title={tutorial.data.summary.title}
          description={tutorial.data.summary.description}
        />
      ))}
    </div>
  )
}

export default ContinuePage
