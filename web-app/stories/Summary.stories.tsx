import React from 'react'

import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'

import Summary from '../src/containers/Tutorial/SummaryPage/Summary'

storiesOf('Tutorial SideBar', module)
  .addDecorator(SideBarDecorator)
  .add('Summary', () => (
    <Summary title="Some Title" text="Some description" onNext={linkTo('Tutorial SideBar', 'Level')} />
  ))
