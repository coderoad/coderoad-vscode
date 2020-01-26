import * as React from 'react'
import * as G from 'typings/graphql'
import channel from '../../../services/channel'
import TutorialItem from './TutorialItem'

interface Props {
  tutorialList: G.Tutorial[]
}

const TutorialList = (props: Props) => {
  const onSelect = (tutorial: G.Tutorial) => {
    channel.machineSend({
      type: 'SELECT_NEW_TUTORIAL',
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
