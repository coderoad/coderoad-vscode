import React from 'react'

import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'

import Router from '../src/components/Router'

const { Route } = Router

storiesOf('Components', module)
  .addDecorator(SideBarDecorator)
  .add('Router', () => (
    <Router state="Third">
      <Route path="First">First</Route>
      <Route path="Second">Second</Route>
      <Route path="Third">Third</Route>
    </Router>
  ))
