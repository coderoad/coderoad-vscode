import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { LoginPage } from '../src/containers/Login'
import SideBarDecorator from './utils/SideBarDecorator'

storiesOf('Login', module)
  .addDecorator(SideBarDecorator)
  .add('Page', () => <LoginPage onGitHubLogin={action('onGitHubLogin')} />)
