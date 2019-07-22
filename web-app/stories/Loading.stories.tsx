import React from 'react'

import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'

import LoadingPage from '../src/containers/LoadingPage'

storiesOf('Components', module)
  .addDecorator(SideBarDecorator)
  .add('Loading', () => <LoadingPage text="Content" />)
