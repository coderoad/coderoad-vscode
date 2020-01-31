import * as React from 'react'
import * as T from 'typings'
import * as G from 'typings/graphql'
import TutorialItem from './TutorialItem'

interface Props {
  send(action: T.Action): void
  tutorialList: G.Tutorial[]
}

const TutorialList = (props: Props) => {
  const onSelect = (tutorial: G.Tutorial) => {
    props.send({
      type: 'TUTORIAL_START',
      payload: {
        tutorial,
      },
    })
  }
  return (
    <div>
      {props.tutorialList.map((tutorial: G.Tutorial) => (
        <TutorialItem
          key={tutorial.id}
          onSelect={() => onSelect(tutorial)}
          title={tutorial.summary.title || ''}
          description={tutorial.summary.description || ''}
        />
      ))}
    </div>
  )
}

export default TutorialList
