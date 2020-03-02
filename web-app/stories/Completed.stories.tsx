import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import CompletedPage from '../src/containers/Tutorial/CompletedPage'
import SideBarDecorator from './utils/SideBarDecorator'

storiesOf('Completed', module)
  .addDecorator(SideBarDecorator)
  .add('Page', () => <CompletedPage context={{}} send={action('send')} />)
