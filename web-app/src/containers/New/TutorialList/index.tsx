import * as React from 'react'

import channel from '../../../services/channel'
import * as T from 'typings/graphql'
import TutorialItem from './TutorialItem'

interface Props {
  tutorialList: T.Tutorial[]
}

const TutorialList = (props: Props) => {
	const onSelect = (tutorial: T.Tutorial) => {
		channel.machineSend({
			type: 'TUTORIAL_START',
			payload: {
				tutorial,
			}
		})
	}
	return (
		<div>
			{props.tutorialList.map((tutorial: T.Tutorial) => (
				<TutorialItem
					key={tutorial.id}
					onSelect={() => onSelect(tutorial)}
					title={tutorial.title || ''}
					text={tutorial.text || ''}
				/>
			))}
		</div>
	)
}

export default TutorialList
