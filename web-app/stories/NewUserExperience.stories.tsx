import { storiesOf } from '@storybook/react'
import React from 'react'
import { css, jsx } from '@emotion/core'
import SideBarDecorator from './utils/SideBarDecorator'
import NewUserExperienceTutorial from '../src/components/NewUserExperience/NuxTutorial'

storiesOf('NewUserExperience', module)
  .addDecorator(SideBarDecorator)
  .add('NUXTutorial', () => <NewUserExperienceTutorial />)
