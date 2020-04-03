import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import SelectTutorial from '../src/containers/SelectTutorial'
import SideBarDecorator from './utils/SideBarDecorator'

const tutorialList = [
  {
    id: '1',
    summary: {
      title: 'Tutorial 1',
      description: 'The first one',
    },
    createdBy: {
      name: 'First Lastname',
    },
  },
  {
    id: '2',
    summary: {
      title: 'Tutorial 2',
      description: 'The second one',
    },
    createdBy: {
      name: 'Joe Schmo',
    },
  },
]

storiesOf('Select Tutorial', module)
  .addDecorator(SideBarDecorator)
  .add('Select Tutorial Page', () => {
    return <SelectTutorial send={action('send')} context={{}} />
  })
