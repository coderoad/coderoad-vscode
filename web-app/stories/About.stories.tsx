import * as React from 'react'
import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'
import AboutPage from '../src/containers/Tutorial/containers/About'

storiesOf('About', module)
  .addDecorator(SideBarDecorator)
  .add('About Page', () => {
    return <AboutPage />
  })
