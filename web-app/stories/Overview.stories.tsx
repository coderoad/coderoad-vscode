import { linkTo } from '@storybook/addon-links'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import OverViewPage from '../src/containers/Overview/OverviewPage'
import SideBarDecorator from './utils/SideBarDecorator'

storiesOf('Overview', module)
  .addDecorator(SideBarDecorator)
  .add('OverView Page', () => {
    const levels = [
      {
        id: 'L1',
        title: 'The First Level',
        summary: 'A Summary of the first level',
      },
      {
        id: 'L2',
        title: 'The Second Level',
        summary: 'A Summary of the second level',
      },
      {
        id: 'L3',
        title: 'The Third Level',
        summary: 'A Summary of the third level',
      },
      {
        id: 'L4',
        title: 'The Fourth Level',
        summary: 'A Summary of the fourth level',
      },
      {
        id: 'L5',
        title: 'The Fifth Level',
        summary: 'A Summary of the fifth level',
      },
      {
        id: 'L6',
        title: 'The Sixth Level',
        summary: 'A Summary of the sixth level',
      },
    ]
    return (
      <OverViewPage
        title="Some Title"
        description="Some description"
        levels={levels}
        onBack={action('back')}
        onNext={linkTo('Tutorial SideBar', 'Level')}
      />
    )
  })
