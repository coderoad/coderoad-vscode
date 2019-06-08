import React from 'react'

import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, object } from '@storybook/addon-knobs'
import SideBarDecorator from './utils/SideBarDecorator'

import demo from './data/basic'
import Summary from '../src/components/Summary'

storiesOf('Tutorial SideBar', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Summary', () => (
    <Summary
      data={object('data', {
        summary: demo.data.summary,
        levels: demo.data.levels,
      })}
      onLevelSelect={linkTo('Tutorial SideBar', 'Level')}
    />
  ))
