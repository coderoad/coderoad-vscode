import * as React from 'react'

import * as T from 'typings/graphql'
import TutorialItem from './TutorialItem'

interface Props {
  tutorialList: T.Tutorial[]
  onNew(id: string): void
}

const TutorialList = (props: Props) => (
  <div>
    {props.tutorialList.map((tutorial: T.Tutorial) => (
      <TutorialItem
        key={tutorial.id}
        onNew={() => props.onNew(tutorial.id)}
        title={tutorial.title || ''}
        text={tutorial.text || ''}
      />
    ))}
  </div>
)

export default TutorialList
