import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SideBarDecorator from './utils/SideBarDecorator'
import NewPage from '../src/containers/New/NewPage'
import TutorialList from '../src/containers/New/TutorialList'
import TutorialItem from '../src/containers/New/TutorialList/TutorialItem'

const tutorialList = [
  {
    id: '1',
    version: {
      summary: {
        title: 'Tutorial 1',
        description: 'The first one',
      },
    },
  },
  {
    id: '2',
    version: {
      summary: {
        title: 'Tutorial 2',
        description: 'The second one',
      },
    },
  },
]

storiesOf('New', module)
  .addDecorator(SideBarDecorator)
  .add('New Page', () => {
    return <NewPage tutorialList={tutorialList} />
  })
  .add('Tutorial List', () => {
    return <TutorialList tutorialList={tutorialList} />
  })
  .add('Tutorial Item', () => {
    const tutorial = tutorialList[0]
    return <TutorialItem onSelect={action('onSelect')} title={tutorial.title} description={tutorial.description} />
  })
