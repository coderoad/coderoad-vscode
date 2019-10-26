import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SideBarDecorator from './utils/SideBarDecorator'
import TutorialList from '../src/containers/New/TutorialList'
import TutorialItem from '../src/containers/New/TutorialList/TutorialItem'

storiesOf('New', module)
  .addDecorator(SideBarDecorator)
  .add('Tutorial List', () => {
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
    return <TutorialList tutorialList={tutorialList} />
  })
  .add('Tutorial Item', () => {
    const tutorial = {
      id: '1',
      title: 'Tutorial 1',
      description: 'The first one',
    }
    return <TutorialItem onSelect={action('onSelect')} title={tutorial.title} description={tutorial.description} />
  })
