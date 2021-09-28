import * as React from 'react'
import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'
import Settings from '../src/containers/Tutorial/containers/Settings'

storiesOf('Settings', module)
  .addDecorator(SideBarDecorator)
  .add('Settings Page', () => {
    return <Settings onReset={() => console.log('Reset...')} />
  })
