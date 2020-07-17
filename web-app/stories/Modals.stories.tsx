import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import SideBarDecorator from './utils/SideBarDecorator'
import Reset from '../src/containers/Tutorial/components/Reset'
import Continue from '../src/containers/Tutorial/components/Continue'

storiesOf('Modals', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Reset', () => <Reset onReset={action('onReset')} />)
  .add('Continue', () => <Continue onContinue={action('onContinue')} />)
