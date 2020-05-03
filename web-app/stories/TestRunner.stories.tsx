import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import SideBarDecorator from './utils/SideBarDecorator'
import TestFail from '../src/components/TestFail'

storiesOf('Test', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Fail', () => <TestFail title="Error Title" description="Description of the error" />)
