import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import SelectTutorial from '../src/containers/SelectTutorial/SelectTutorial'
import TutorialItem from '../src/containers/SelectTutorial/TutorialItem'
import SideBarDecorator from './utils/SideBarDecorator'

const tutorialList = [
  {
    id: '1',
    summary: {
      title: 'Tutorial 1',
      description: 'The first one',
    },
  },
  {
    id: '2',
    summary: {
      title: 'Tutorial 2',
      description: 'The second one',
    },
  },
]

storiesOf('Select Tutorial', module)
  .addDecorator(SideBarDecorator)
  .add('Select Tutorial Page', () => {
    return <SelectTutorial tutorialList={tutorialList} send={action('send')} />
  })
  .add('Tutorial Item', () => {
    const tutorial = tutorialList[0]
    return (
      <TutorialItem
        onSelect={action('onSelect')}
        title={tutorial.summary.title}
        description={tutorial.summary.description}
      />
    )
  })
