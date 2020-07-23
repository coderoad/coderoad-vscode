import { storiesOf } from '@storybook/react'
import React from 'react'
import CompletedBanner from '../src/containers/Tutorial/components/CompletedBanner'
import SideBarDecorator from './utils/SideBarDecorator'

storiesOf('Completed', module)
  .addDecorator(SideBarDecorator)
  .add('Page', () => <CompletedBanner title="A tutorial name" />)
