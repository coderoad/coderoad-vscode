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
  .add('Continue', () => <Continue title="Tutorial Title" current={9} max={11} onContinue={action('onContinue')} />)
  .add('Continue Complete', () => (
    <Continue title="Tutorial Title" current={11} max={11} onContinue={action('onContinue')} />
  ))
