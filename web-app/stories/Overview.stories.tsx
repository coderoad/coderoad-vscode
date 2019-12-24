import { linkTo } from '@storybook/addon-links'
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
        description: 'A Summary of the first level',
      },
      {
        id: 'L2',
        title: 'The Second Level',
        description: 'A Summary of the second level',
      },
      {
        id: 'L3',
        title: 'The Third Level',
        description: 'A Summary of the third level',
      },
    ]
    return (
      <OverViewPage
        title="Some Title"
        description="Some description"
        levels={levels}
        onNext={linkTo('Tutorial SideBar', 'Level')}
      />
    )
  })
