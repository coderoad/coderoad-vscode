import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import NewPage from '../src/containers/New/NewPage'
import TutorialList from '../src/containers/New/TutorialList'
import TutorialItem from '../src/containers/New/TutorialList/TutorialItem'
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
  .add('New Page', () => {
    return <NewPage tutorialList={tutorialList} />
  })
  .add('Tutorial List', () => {
    return <TutorialList tutorialList={tutorialList} />
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
