import React from 'react'

import { object, withKnobs } from '@storybook/addon-knobs'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'

import Summary from '../src/components/Summary'
import demo from './data/basic'

storiesOf('Tutorial SideBar', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Summary', () => (
    <Summary
      data={object('data', {
        levels: demo.data.levels,
        summary: demo.data.summary,
      })}
      onNext={linkTo('Tutorial SideBar', 'Level')}
    />
  ))
