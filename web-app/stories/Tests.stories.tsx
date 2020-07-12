import { storiesOf } from '@storybook/react'
import React from 'react'
import TestMessage from '../src/components/TestMessage'
import SideBarDecorator from './utils/SideBarDecorator'

storiesOf('Test Message', module)
  .addDecorator(SideBarDecorator)
  .add('Fail', () => <TestMessage message={'Test failed for some reason'} />)
